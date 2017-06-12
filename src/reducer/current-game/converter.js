// @flow
import {GameStage} from '../../game-stage'
import {bidWinGenerator} from './bid-win-generator'
import type {WaitingBidState, WaitingWinState, EndedState} from './types'

export function toWaitingBidState(state: WaitingBidState | WaitingWinState): WaitingBidState {
  const cloned: WaitingBidState = {
    bid: bidWinGenerator(Object.keys(state.names)),
    ...state,
    stage: GameStage.waitingBid
  }
  delete (cloned: any).win
  return cloned
}

export function toWaitingWinState(state: WaitingBidState | WaitingWinState): WaitingWinState {
  return {
    bid: bidWinGenerator(Object.keys(state.names)),
    win: bidWinGenerator(Object.keys(state.names)),
    ...state,
    stage: GameStage.waitingWin
  }
}

export function toEndedState(state: WaitingBidState | WaitingWinState, endTime: Date): EndedState {
  return {
    stage: GameStage.ended,
    endTime,
    rounds: state.rounds,
    startTime: state.startTime,
    names: state.names,
    scores: state.scores
  }
}
