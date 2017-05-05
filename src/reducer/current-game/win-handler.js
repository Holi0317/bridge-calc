// @flow
import {GameStage} from '../../game-stage'
import {computeScores} from './compute-scores'
import {toFront} from '../../utils'

import type {GameState, WaitingBidState, WaitingWinState, EndedState} from './types'
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
    const newState: EndedState = {
      ...state,
      stage: GameStage.ended,
      scores: computeScores(state.bid, win, state.scores),
      endTime: action.time
    }
    delete (newState: any).bid
    delete (newState: any).win
    delete (newState: any).currentPlayerOrder
    delete (newState: any).currentRound
    return newState
  } else {
    const newState: WaitingBidState = {
      ...state,
      stage: GameStage.waitingBid,
      bid: {},
      currentRound: state.currentRound + 1,
      currentPlayerOrder: toFront(state.currentPlayerOrder, 1),
      scores: computeScores(state.bid, win, state.scores)
    }
    delete (newState: any).win
    return newState
  }
}
