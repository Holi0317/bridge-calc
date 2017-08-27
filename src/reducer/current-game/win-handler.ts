import {GameStage} from '../../game-stage'
import {computeScores} from './compute-scores'
import {toEndedState, toWaitingBidState} from './converter'
import {bidWinGenerator} from './bid-win-generator'
import {toFront} from '../../utils'
import {GameState, IWaitingBidState, IWaitingWinState} from './types'
import {IWinAction} from '../../actions/current-game'

/**
 * Handler for WIN action
 */
export function winHandler(state: IWaitingBidState | IWaitingWinState, action: IWinAction): GameState {
  if (state.stage === GameStage.waitingBid) {
    return state
  }
  const win = action.win || state.win
  if (state.rounds === state.currentRound) {
    // Last round
    const newState = toEndedState(state, action.time)
    return {
      ...newState,
      scores: computeScores(state.bid, win, state.scores)
    }
  } else {
    // Proceed to next round
    const newState = toWaitingBidState(state)
    newState.bid = bidWinGenerator(Object.keys(state.names))
    newState.currentRound = state.currentRound + 1
    newState.currentPlayerOrder = toFront(state.currentPlayerOrder, 1)
    newState.scores = computeScores(state.bid, win, state.scores)
    return newState
  }
}
