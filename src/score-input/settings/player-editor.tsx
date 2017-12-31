import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import * as cuid from 'cuid'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import {
  ADD_NAME, IAddNameAction, ISetByGameStateAction, ISetNamesAction, SET_BY_GAME_STATE,
  SET_NAMES
} from './actions/index'
import {NameInputList} from '../../name-input-list'
import {nameInputListSourceSelector, PlayerName, revert} from './selectors/name-input-list-source'
import {Dispatch, IPlayerMap, IRootState, ITranslateMixin} from '../../types'
import {GameState} from '../reducer'
import {randomName} from '../../example-names'
import {returntypeof} from 'react-redux-typescript'
import style from './player-editor.css'

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

const mapStateToProps = (state: IRootState, {t}: ITranslateMixin) => ({
  currentGame: state.currentGame,
  names: nameInputListSourceSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  init(state: GameState) {
    const action: ISetByGameStateAction = {
      type: SET_BY_GAME_STATE,
      state
    }
    dispatch(action)
  },
  changeNames(rawNewNames: PlayerName[]) {
    const newNames = revert(rawNewNames)
    const action: ISetNamesAction = {
      type: SET_NAMES,
      newNames
    }
    dispatch(action)
  },
  addPlayer() {
    const action: IAddNameAction = {
      type: ADD_NAME,
      name: randomName(),
      ID: cuid()
    }
    dispatch(action)
  },
  applyChange() {
    // TODO
  }
})

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

/**
 * Edit player's names, order and delete them
 */
export class PlayerEditorImpl extends React.Component {
  public props: typeof stateType & typeof dispatchType & ITranslateMixin

  public componentWillMount() {
    const state = this.props.currentGame
    this.props.init(state)
  }

  public render() {
    const {names, changeNames, addPlayer, t} = this.props
    return (
      <div>
        <h4>{t('Edit players')}</h4>
        <NameInputList values={names} error={{}}
          getter={getter} setter={setter} errorGetter={errorGetter}
          onChange={changeNames} />
        <div className={style.addContainer}>
          <IconButton tooltip={t('Add player')} onClick={addPlayer}>
            <ContentAdd width="28px" height="28px" />
          </IconButton>
        </div>
        <div className={style.btnContainer}>
          <RaisedButton primary={true} className={style.startBtn} disabled={true} onClick={this.dispatch}>{t('Change names')}</RaisedButton>
        </div>
      </div>
    )
  }

  private dispatch = () => {
    // TODO Show maker chooser, max rounds chooser in a dialog.
    // TODO Validation: Will added player cause insufficient rounds?
  }
}

export const PlayerEditor = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(PlayerEditorImpl)
