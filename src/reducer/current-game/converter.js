// @flow
import {GameStage} from '../../game-stage'
import type {WaitingBidState, WaitingWinState, EndedState} from './types'

export function toWaitingBidState(state: WaitingBidState | WaitingWinState): WaitingBidState {
  const cloned: WaitingBidState = {
    bid: {},
    ...state,
    stage: GameStage.waitingBid
  }
  delete (cloned: any).win
  return cloned
}

export function toWaitingWinState(state: WaitingBidState | WaitingWinState): WaitingWinState {
  return {
    bid: {},
    win: {},
    ...state,
    stage: GameStage.waitingWin
  }
}

export function toEndedState(state: WaitingBidState | WaitingWinState, endTime: Date): EndedState {
  const cloned: EndedState = {
    endTime,
    ...state,
    stage: GameStage.ended
  }

  delete (cloned: any).bid
  delete (cloned: any).currentPlayerOrder
  delete (cloned: any).currentRound

  return cloned
}
