// @flow
import mapValues from 'lodash-es/mapValues'
import {GameStage} from '../../game-stage'
import {toFront} from '../../utils'
import {toEndedState} from './converter'
import {bidWinGenerator} from './bid-win-generator'

import type {EndedState, WaitingBidState, WaitingWinState} from './types'

/**
 * Helper function for reducer.
 * Skip n round(s) of game.
 */
export function skip(state: WaitingBidState | WaitingWinState, n: number, time: Date): WaitingBidState | EndedState | null {
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
      return state
    }
  }
  const newState: WaitingBidState = {
    ...state,
    stage: GameStage.waitingBid,
    bid: bidWinGenerator(Object.keys(state.names)),
    scores: mapValues(state.scores, score => [...score, 0]),
    currentPlayerOrder: toFront(state.currentPlayerOrder, 1),
    currentRound: state.currentRound + 1
  }

  // Remove unused property
  delete (newState: any).win

  return skip(newState, n - 1, time)
}
