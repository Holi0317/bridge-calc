// @flow
import {GameStage} from '../../game-stage'
import {computeScores} from './compute-scores'
import {toEndedState} from './converter'
import {bidWinGenerator} from './bid-win-generator'
import {toFront} from '../../utils'

import type {GameState, WaitingBidState, WaitingWinState} from './types'
import type {WIN_ACTION} from '../../actions/current-game'

/**
 * Handler for WIN action
 */
export function winHandler(state: WaitingBidState | WaitingWinState, action: WIN_ACTION): GameState {
  if (state.stage === GameStage.waitingBid) {
    return state
  }
  const win = action.win || state.win
  if (state.rounds === state.currentRound) {
    // Last round
    const newState: WaitingWinState = {
      ...state,
      scores: computeScores(state.bid, win, state.scores)
    }
    return toEndedState(newState, action.time)
  } else {
    const newState: WaitingBidState = {
      ...state,
      stage: GameStage.waitingBid,
      bid: bidWinGenerator(Object.keys(state.names)),
      currentRound: state.currentRound + 1,
      currentPlayerOrder: toFront(state.currentPlayerOrder, 1),
      scores: computeScores(state.bid, win, state.scores)
    }
    delete (newState: any).win
    return newState
  }
}
