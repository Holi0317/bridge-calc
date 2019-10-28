import { GameStage } from "../game-stage";
import { bidWinGenerator } from "./bid-win-generator";
import { WaitingBidState, WaitingWinState, EndedState } from "./types";

export function toWaitingBidState(
  state: WaitingBidState | WaitingWinState
): WaitingBidState {
  return {
    stage: GameStage.waitingBid,
    id: state.id,
    rounds: state.rounds,
    startTime: state.startTime,
    names: state.names,
    scores: state.scores,
    currentPlayerOrder: state.currentPlayerOrder,
    currentRound: state.currentRound,
    bid: state.bid
  };
}

export function toWaitingWinState(
  state: WaitingBidState | WaitingWinState
): WaitingWinState {
  // Cast to any for remove some whitelist boilerplate
  const newState = toWaitingBidState(state) as any;
  newState.stage = GameStage.waitingWin;
  newState.win =
    (state as WaitingWinState).win || bidWinGenerator(Object.keys(state.names));
  return newState;
}

export function toEndedState(
  state: WaitingBidState | WaitingWinState,
  endTime: number
): EndedState {
  return {
    stage: GameStage.ended,
    endTime,
    id: state.id,
    rounds: state.rounds,
    startTime: state.startTime,
    names: state.names,
    scores: state.scores
  };
}
