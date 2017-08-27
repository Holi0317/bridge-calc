// @flow
import {h, Component} from 'preact'
import {connect} from 'preact-redux'
import {translate} from 'react-i18next'
import Button from 'preact-material-components/Button/Button'
import {ADD_NAME, SET_BY_GAME_STATE, SET_NAMES} from '../../actions/ui/settings'
import {NameInputList} from '../name-input-list'
import {nameInputListSourceSelector, revert} from '../../selectors/ui/settings/name-input-list-source'
import {isValidPlayerEditor, playerEditorValidatorSelector} from '../../selectors/validators/player-editor'
import style from './player-editor.css'

import type {Dispatch, IPlayerMap, RootState, I18nT} from '../../types'
import type {IPlayerEditorError} from '../../validators/player-editor'
import type {PlayerName} from '../../selectors/ui/settings/name-input-list-source'
import type {SET_BY_GAME_STATE_ACTION, SET_NAMES_ACTION, ADD_NAME_ACTION} from '../../actions/ui/settings'
import type {GameState} from '../../reducer/current-game/types'
import {IconButton} from '../mdc/icon-button'
import MdAdd from 'react-icons/md/add'
import {randomName} from '../../example-names'
import {genID} from '../../utils'

/**
 * Get player name from PlayerName type.
 * Used as getter of name-input-list component.
 */
const getter = ([, name]: PlayerName) => name

/**
 * Set player name for PlayerName type.
 * Used as setter of name-input-list component.
 */
const setter = (newVal: string, [ID]: PlayerName): PlayerName => ([ID, newVal])

/**
 * Error getter for name-input-list component
 */
const errorGetter = (error: IPlayerMap<string>, value: PlayerName) => error[value[0]]

/**
 * Edit player's names, order and delete them
 */
class DisconnectPlayerEditor extends Component {
  props: {
    names: PlayerName[],
    error: IPlayerEditorError,
    isValid: boolean,
    currentGame: GameState,

    init: (state: GameState) => void,
    changeNames: (newNames: PlayerName[]) => void,
    addPlayer: () => void,
    t: I18nT
  }

  componentWillMount() {
    const state = this.props.currentGame
    this.props.init(state)
  }

  dispatch = () => {
    // TODO Show maker chooser, max rounds chooser in a dialog.
    // TODO Validation: Will added player cause insufficient rounds?
  }

  render() {
    const {names, error, isValid, changeNames, addPlayer, t} = this.props
    return (
      <div>
        <h4>{t('Edit players')}</h4>
        <NameInputList values={names} error={error.names}
          getter={getter} setter={setter} errorGetter={errorGetter}
          onChange={changeNames} />
        <div className={style.addContainer}>
          <IconButton icon={<MdAdd width="28px" height="28px" />} tooltip={t('Add player')} onClick={addPlayer} />
        </div>
        <div className={style.btnContainer}>
          <Button raised accent className={style.startBtn} disabled={!isValid} onClick={this.dispatch}>{t('Change names')}</Button>
          <span className={style.errorMessage}>{error.misc}</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState, {t}) => ({
  currentGame: state.currentGame,
  names: nameInputListSourceSelector(state),
  error: playerEditorValidatorSelector(state, t),
  isValid: isValidPlayerEditor(state, t)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  init(state: GameState) {
    const action: SET_BY_GAME_STATE_ACTION = {
      type: SET_BY_GAME_STATE,
      state
    }
    dispatch(action)
  },
  changeNames(newNames_: PlayerName[]) {
    const newNames = revert(newNames_)
    const action: SET_NAMES_ACTION = {
      type: SET_NAMES,
      newNames
    }
    dispatch(action)
  },
  addPlayer() {
    const action: ADD_NAME_ACTION = {
      type: ADD_NAME,
      name: randomName(),
      ID: genID()
    }
    dispatch(action)
  },
  applyChange() {

  }
})

export const PlayerEditor = translate()(connect(mapStateToProps, mapDispatchToProps)(DisconnectPlayerEditor))
