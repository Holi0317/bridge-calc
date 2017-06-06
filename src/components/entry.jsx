// @flow
import {h, Component} from 'preact'
import {connect} from 'preact-redux'
import {translate} from 'react-i18next'
import {withRouter} from 'react-router-dom'
import Button from 'preact-material-components/Button/Button'
import {IconButton} from './mdc/icon-button'
import MdAdd from 'react-icons/md/add'
import MdFileDownload from 'react-icons/md/file-download'
import Collapse from 'react-collapse'
import {NameInputList} from './name-input-list'
import {OPTION_OPEN_TOGGLE, PLAYER_NAMES_SET, ADD_PLAYER} from '../actions/ui/entry'
import {START} from '../actions/current-game'
import {EntryOptions} from './entry-options'
import {genRandomNames, randomName} from '../example-names'
import {entryOptionsValidatorSelector, validEntryOptionsSelector} from '../selectors/entry-options-validator'
import {genID} from '../utils'
import style from './entry.css'
import grid from '../styles/grid.css'

import type {EntryState} from '../reducer/ui/entry'
import type {Dispatch, RootState} from '../types'
import type {START_ACTION} from '../actions/current-game'
import type {PLAYER_NAMES_SET_ACTION, ADD_PLAYER_ACTION, OPTION_OPEN_TOGGLE_ACTION} from '../actions/ui/entry'

/**
 * Change player names array to object with random generated player ID as key.
 * @param playerNames
 */
function namesToObject(playerNames: string[]) {
  const result = {}
  playerNames.forEach(name => {
    result[genID()] = name
  })
  return result
}

class DisconnectedEntry extends Component {
  props: {
    valid: boolean,
    miscError: ?string,
    playerNamesError: ?string[],
    t: (t: string) => string,
    toggleCollapse: () => void,
    genOptions: () => void,
    changePlayerNames: (payload: string[]) => void,
    addPlayer: () => void,
    importNames: () => void,
    start: (param: START_ACTION) => void,
    history: string[] // This is in fact react-router's history object. But mocking it as array works to suppress flow
  } & EntryState

  componentWillMount() {
    this.props.genOptions()
  }

  /**
   * Emit START action to redux.
   * Not to be confused with this.props.start
   */
  start = () => {
    const {rounds, playerNames, startingRound, start, history} = this.props
    const startParam: START_ACTION = {
      rounds,
      startingRound,
      playerNames: namesToObject(playerNames),
      startTime: new Date(),
      type: START
    }
    start(startParam)
    history.push('/game')
  }

  /**
   * Entry view element. Contains form need to be filled in before starting game.
   * @returns {XML}
   */
  render() {
    const {t} = this.props
    const props = this.props
    return (
      <div className={grid.container}>
        <h3>{t('Player Names')}</h3>
        <NameInputList names={props.playerNames} error={props.playerNamesError} onChange={props.changePlayerNames} />
        <div className={style.actionButtonContainer}>
          {/* TODO the following two have tooltip */}
          <IconButton icon={<MdAdd width="28px" height="28px" />} tooltip={t('Add player')} onClick={props.addPlayer} />
          <IconButton icon={<MdFileDownload width="28px" height="28px" />} tooltip={t('Import names')} onClick={props.importNames} />
        </div>
        <hr />

        <Button onClick={props.toggleCollapse} raised className={style.optionsBtn}>{t('Options')}</Button>
        <Collapse isOpened={props.optionsOpened}>
          <EntryOptions />
        </Collapse>

        <Button raised accent className={style.startBtn} disabled={!props.valid} onClick={this.start}>{t('Start')}</Button>
        <span className={style.errorMessage}>{props.miscError}</span>
      </div>
    )
  }
}

function mapStateToProps(state: RootState, {t}) {
  const validatorResult = entryOptionsValidatorSelector(state, t)
  const valid = validEntryOptionsSelector(state, t)
  return {
    ...state.ui.entry,
    valid,
    miscError: validatorResult.misc,
    playerNamesError: validatorResult.playerNames
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    toggleCollapse() {
      const action: OPTION_OPEN_TOGGLE_ACTION = {type: OPTION_OPEN_TOGGLE}
      dispatch(action)
    },
    changePlayerNames(payload: string[]) {
      const action: PLAYER_NAMES_SET_ACTION = {type: PLAYER_NAMES_SET, payload}
      dispatch(action)
    },
    genOptions() {
      const action: PLAYER_NAMES_SET_ACTION = {type: PLAYER_NAMES_SET, payload: genRandomNames()}
      dispatch(action)
    },
    addPlayer() {
      const action: ADD_PLAYER_ACTION = {type: ADD_PLAYER, payload: randomName()}
      dispatch(action)
    },
    importNames() {
      // TODO NYI
    },
    start(param: START_ACTION) {
      const action: START_ACTION = {...param, type: START}
      dispatch(action)
    }
  }
}

export const Entry = withRouter(translate()(connect(mapStateToProps, mapDispatchToProps)(DisconnectedEntry)))
