import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {returntypeof} from 'react-redux-typescript'
import RaisedButton from 'material-ui/RaisedButton'
import {GameStage} from '../../game-stage'
import {BID, IBidAction, IUndoAction, IWinAction, UNDO, WIN} from '../../actions/current-game'
import {Dispatch, IRootState, ITranslateMixin} from '../../types'
import {GameState} from '../../reducer/current-game/index'
import {stageSelector} from '../../selectors/current-game/stage'
import {validStackInput} from '../../selectors/validators/stack-input-validator'
import style from './action-buttons.css'

const mapStateToProps = (state: IRootState, {t}: ITranslateMixin) => ({
  undoDisabled: stageSelector(state) !== GameStage.waitingWin,
  nextDisabled: !validStackInput(state, t),
  currentGame: state.currentGame
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  next(state: GameState) {
    return () => {
      if (!state) {
        // Just to eliminate state is null case
      } else if (state.stage === GameStage.waitingBid) {
        const action: IBidAction = {type: BID, payload: state.bid}
        dispatch(action)
      } else if (state.stage === GameStage.waitingWin) {
        const action: IWinAction = {type: WIN, win: state.win, time: new Date()}
        dispatch(action)
      }
    }
  },
  undo(stage: string) {
    return () => {
      if (stage === GameStage.waitingWin) {
        const action: IUndoAction = {type: UNDO}
        dispatch(action)
      }
    }
  }
})

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type ActionButtonsProps = typeof stateType & typeof dispatchType & ITranslateMixin

function DisconnectActionButtons({t, nextDisabled, undoDisabled, currentGame, next, undo}: ActionButtonsProps) {
  const undoHandler = currentGame == null
    ? undefined  // Material-ui needs this to be undefined instead of null
    : undo(currentGame.stage)
  return (
    <div className={style.btnContainer}>
      <RaisedButton primary={true} disabled={nextDisabled} onClick={next(currentGame)}>{t('Next')}</RaisedButton>
      <div className={style.stretch} />
      <RaisedButton disabled={undoDisabled} onClick={undoHandler}>{t('Undo')}</RaisedButton>
    </div>
  )
}

export const ActionButtons = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(DisconnectActionButtons)
