import mapValues from 'lodash-es/mapValues'
import {toFront} from '../../utils'
import {toEndedState, toWaitingBidState} from './converter'
import {bidWinGenerator} from './bid-win-generator'
import {IEndedState, IWaitingBidState, IWaitingWinState} from './types'

/**
 * Helper function for reducer.
 * Skip n round(s) of game.
 */
export function skip(state: IWaitingBidState | IWaitingWinState, n: number, time: Date): IWaitingBidState | IEndedState | null {
  if (state === null) {
    return null
  }
  if (n === 0) {
    // Last skip action.
    if (state.currentRound === state.rounds) {
      // Last round
      return toEndedState(state, time)
    } else {
      // Not last round
      return toWaitingBidState(state)
    }
  }

  const newState = toWaitingBidState(state)
  newState.bid = bidWinGenerator(Object.keys(state.names))
  newState.scores = mapValues(state.scores, score => [...score, 0])
  newState.currentPlayerOrder = toFront(state.currentPlayerOrder, 1)
  newState.currentRound = state.currentRound + 1

  return skip(newState, n - 1, time)
}
