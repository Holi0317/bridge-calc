import * as React from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {withRouter} from 'react-router-dom'
import Collapse from 'react-collapse'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import {NameInputList} from './name-input-list'
import {IPlayerNamesSetAction, IAddPlayerAction, IOptionOpenToggleAction, OPTION_OPEN_TOGGLE, PLAYER_NAMES_SET, ADD_PLAYER} from '../actions/ui/entry'
import {IStartAction, START} from '../actions/current-game'
import {EntryOptions} from './entry-options'
import {genRandomNames, randomName} from '../example-names'
import {entryOptionsValidatorSelector, validEntryOptionsSelector} from '../selectors/validators/entry-options-validator'
import {genID} from '../utils'
import {Dispatch, IPlayerMap, IRootState, ITranslateMixin} from '../types'
import {returntypeof} from 'react-redux-typescript'
import {RouteComponentProps} from 'react-router'
import style from './entry.css'
import grid from '../styles/grid.css'

/**
 * Change player names array to object with random generated player ID as key.
 * @param playerNames
 */
function namesToObject(playerNames: string[]) {
  const result: IPlayerMap<string> = {}
  playerNames.forEach(name => {
    result[genID()] = name
  })
  return result
}

// Getters and setters for name input list element
export const getter = (val: string) => val

export const setter = (newVal: string) => newVal

export const errorGetter = (error: string[], value: string, index: number) => error[index]

function mapStateToProps(state: IRootState, {t}: ITranslateMixin) {
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
      const action: IOptionOpenToggleAction = {type: OPTION_OPEN_TOGGLE}
      dispatch(action)
    },
    changePlayerNames(payload: string[]) {
      const action: IPlayerNamesSetAction = {type: PLAYER_NAMES_SET, payload}
      dispatch(action)
    },
    genOptions() {
      const action: IPlayerNamesSetAction = {type: PLAYER_NAMES_SET, payload: genRandomNames()}
      dispatch(action)
    },
    addPlayer() {
      const action: IAddPlayerAction = {type: ADD_PLAYER, payload: randomName()}
      dispatch(action)
    },
    importNames() {
      // TODO NYI
    },
    start(param: IStartAction) {
      const action: IStartAction = {...param, type: START}
      dispatch(action)
    }
  }
}

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type EntryProps = typeof stateType & typeof dispatchType & RouteComponentProps<any> & ITranslateMixin

class EntryImpl extends React.Component {
  public props: EntryProps

  public componentWillMount() {
    this.props.genOptions()
  }

  /**
   * Entry view element. Contains form need to be filled in before starting game.
   */
  public render() {
    const {t} = this.props
    const props = this.props
    return (
      <div className={grid.container}>
        <h3>{t('Player Names')}</h3>
        <NameInputList values={props.playerNames} error={props.playerNamesError || []}
          onChange={props.changePlayerNames}
          getter={getter} setter={setter} errorGetter={errorGetter} />
        <div className={style.actionButtonContainer}>
          <IconButton tooltip={t('Add player')} onClick={props.addPlayer}>
            <ContentAdd width="28px" height="28px" />
          </IconButton>
          <IconButton tooltip={t('Import names')} onClick={props.importNames}>
            <FileDownload width="28px" height="28px" />
          </IconButton>
        </div>
        <hr />

        <RaisedButton onClick={props.toggleCollapse} className={style.optionsBtn}>{t('Options')}</RaisedButton>
        <Collapse isOpened={props.optionsOpened}>
          <EntryOptions />
        </Collapse>

        <div className={style.startBtnContainer}>
          <RaisedButton primary={true} disabled={!props.valid} onClick={this.start}>{t('Start')}</RaisedButton>
          <span className={style.errorMessage}>{props.miscError}</span>
        </div>
      </div>
    )
  }

  /**
   * Emit START action to redux.
   * Not to be confused with this.props.start
   */
  private start = () => {
    const {rounds, playerNames, startingRound, start, history} = this.props
    const startParam: IStartAction = {
      rounds,
      startingRound,
      playerNames: namesToObject(playerNames),
      startTime: new Date(),
      type: START
    }
    start(startParam)
    history.push('/game')
  }
}

export const Entry = withRouter(translate()(connect(mapStateToProps, mapDispatchToProps)(EntryImpl as any)))
