import { GameStage } from "../game-stage";
import { computeScores } from "./compute-scores";
import { toEndedState, toWaitingBidState } from "./converter";
import { bidWinGenerator } from "./bid-win-generator";
import { toFront } from "../../utils";
import { GameState, WaitingBidState, WaitingWinState } from "./types";
import { WinAction } from "../actions/win";

/**
 * Handler for WIN action
 */
export function winHandler(
  state: WaitingBidState | WaitingWinState,
  action: WinAction
): GameState {
  if (state.stage === GameStage.waitingBid) {
    return state;
  }
  const win = action.win || state.win;
  if (state.rounds === state.currentRound) {
    // Last round
    const newState = toEndedState(state, action.time);
    return {
      ...newState,
      scores: computeScores(state.bid, win, state.scores)
    };
  }
  // Proceed to next round
  const newState = toWaitingBidState(state);
  newState.bid = bidWinGenerator(Object.keys(state.names));
  newState.currentRound = state.currentRound + 1;
  newState.currentPlayerOrder = toFront(state.currentPlayerOrder, 1);
  newState.scores = computeScores(state.bid, win, state.scores);
  return newState;
}
