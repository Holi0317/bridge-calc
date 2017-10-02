import {GameStage} from '../../game-stage'
import {bidWinGenerator} from './bid-win-generator'
import {IWaitingBidState, IWaitingWinState, IEndedState} from './types'

export function toWaitingBidState(state: IWaitingBidState | IWaitingWinState): IWaitingBidState {
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

export function toWaitingWinState(state: IWaitingBidState | IWaitingWinState): IWaitingWinState {
  const newState = toWaitingBidState(state) as any // Just to remove some whitelist boilerplate
  newState.stage = GameStage.waitingWin
  newState.win = (state as any).win || bidWinGenerator(Object.keys(state.names))
  return newState
}

export function toEndedState(state: IWaitingBidState | IWaitingWinState, endTime: Date): IEndedState {
  return {
    stage: GameStage.ended,
    endTime,
    rounds: state.rounds,
    startTime: state.startTime,
    names: state.names,
    scores: state.scores
  }
}
