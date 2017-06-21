// @flow
import {GameStage} from '../../game-stage'
import {bidWinGenerator} from './bid-win-generator'
import type {WaitingBidState, WaitingWinState, EndedState} from './types'

export function toWaitingBidState(state: WaitingBidState | WaitingWinState): WaitingBidState {
  return {
    stage: GameStage.waitingBid,
    rounds: state.rounds,
    startTime: state.startTime,
    names: state.names,
    scores: state.scores,
    currentPlayerOrder: state.currentPlayerOrder,
    currentRound: state.currentRound,
    bid: state.bid
  }
}

export function toWaitingWinState(state: WaitingBidState | WaitingWinState): WaitingWinState {
  const newState = (toWaitingBidState(state): any) // Just to remove some whitelist boilerplate
  newState.stage = GameStage.waitingWin
  newState.win = (state: any).win || bidWinGenerator(Object.keys(state.names))
  return newState
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
