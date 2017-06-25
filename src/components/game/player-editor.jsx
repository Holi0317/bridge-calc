// @flow
import {h, Component} from 'preact'
import {connect} from 'preact-redux'
import {translate} from 'react-i18next'
import Button from 'preact-material-components/Button/Button'
import {SET_BY_GAME_STATE, SET_NAMES} from '../../actions/ui/settings'
import {NameInputList} from '../name-input-list'
import {nameInputListSourceSelector, revert} from '../../selectors/ui/settings/name-input-list-source'
import {isValidPlayerEditor, playerEditorValidatorSelector} from '../../selectors/validators/player-editor'
import style from './player-editor.css'

import type {Dispatch, PlayerMap, RootState, T} from '../../types'
import type {PlayerEditorError} from '../../validators/player-editor'
import type {PlayerName} from '../../selectors/ui/settings/name-input-list-source'
import type {SET_BY_GAME_STATE_ACTION, SET_NAMES_ACTION} from '../../actions/ui/settings'
import type {GameState} from '../../reducer/current-game/types'

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
const errorGetter = (error: PlayerMap<string>, value: PlayerName) => error[value[0]]

/**
 * Edit player's names, order and delete them
 */
class DisconnectPlayerEditor extends Component {
  props: {
    names: PlayerName[],
    error: PlayerEditorError,
    isValid: boolean,
    currentGame: GameState,

    init: (state: GameState) => void,
    changeNames: (newNames: PlayerName[]) => void,
    t: T
  }

  componentWillMount() {
    const state = this.props.currentGame
    this.props.init(state)
  }

  dispatch = () => {
    // TODO Allow add player
    // TODO Show maker chooser, max rounds chooser in a dialog.
    // TODO Validation: Will added player cause insufficient rounds?
  }

  render() {
    const {names, error, isValid, changeNames, t} = this.props
    return (
      <div>
        <h4>{t('Edit players')}</h4>
        <NameInputList values={names} error={error.names}
          getter={getter} setter={setter} errorGetter={errorGetter}
          onChange={changeNames} />
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
  applyChange() {

  }
})

export const PlayerEditor = translate()(connect(mapStateToProps, mapDispatchToProps)(DisconnectPlayerEditor))
