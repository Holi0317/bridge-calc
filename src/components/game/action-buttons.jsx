// @flow
import {h} from 'preact'
import {connect} from 'preact-redux'
import {translate} from 'react-i18next'
import Button from 'preact-material-components/Button/Button'
import {GameStage} from '../../game-stage'
import {BID, UNDO, WIN} from '../../actions/current-game'
import style from './action-buttons.css'

import type {Dispatch, RootState, I18nT} from '../../types'
import type {IBidAction, IWinAction, IUndoAction} from '../../actions/current-game'
import type {GameState} from '../../reducer/current-game/index'
import {stageSelector} from '../../selectors/current-game/stage'
import {validStackInput} from '../../selectors/validators/stack-input-validator'

type ActionButtonsProps = {
  t: I18nT,
  currentGame: GameState,
  nextDisabled: boolean,
  undoDisabled: boolean,
  next: (state: GameState) => () => void,
  undo: (stage: string) => () => void
}

function DisconnectActionButtons({t, nextDisabled, undoDisabled, currentGame, next, undo}: ActionButtonsProps) {
  const undoHandler = currentGame == null ? null : undo(currentGame.stage)
  return (
    <div className={style.btnContainer}>
      <Button accent raised disabled={nextDisabled} onClick={next(currentGame)}>{t('Next')}</Button>
      <div className={style.stretch} />
      <Button raised disabled={undoDisabled} onClick={undoHandler}>{t('Undo')}</Button>
    </div>
  )
}

function mapStateToProps(state: RootState, {t}) {
  return {
    undoDisabled: stageSelector(state) !== GameStage.waitingWin,
    nextDisabled: !validStackInput(state, t),
    currentGame: state.currentGame
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    next(state: GameState) {
      return () => {
        if (!state) {
          // Just to eliminate state is null case
        } else if (state.stage === GameStage.waitingBid) {
          const action: IBidAction = {type: BID, payload: state.bid}
          dispatch(action)
        } else if (state.stage === GameStage.waitingWin) {
          const action: IWinAction = {type: WIN, payload: state.win, time: new Date()}
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
  }
}

export const ActionButtons = translate()(connect(mapStateToProps, mapDispatchToProps)(DisconnectActionButtons))
