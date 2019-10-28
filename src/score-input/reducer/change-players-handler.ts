import mapValues from "lodash-es/mapValues";
import range from "lodash-es/range";
import { toEndedState, toWaitingBidState } from "./converter";
import { toFront } from "../../utils";
import { EndedState, WaitingBidState, WaitingWinState } from "./types";
import { ChangePlayersAction } from "../actions/change-players";

export function changePlayersHandler(
  rawState: WaitingBidState | WaitingWinState,
  { newNames, rounds, maker, time }: ChangePlayersAction
): WaitingBidState | EndedState {
  // Short circuit. When action.rounds is less than current round
  if (rounds < rawState.currentRound) {
    /*
     * Tslint false positive on shallowed variable -- Shallowed variable on the else branch
     * tslint:disable-next-line: no-shadowed-variable
     */
    const state = toEndedState(rawState, time);
    state.names = newNames;
    state.rounds = rounds;
    state.scores = mapValues(state.scores, (score: number[]) =>
      score.slice(0, rounds)
    );
    return state;
  }

  const state = toWaitingBidState(rawState);
  state.rounds = rounds;

  // Set currentPlayerOrder
  const newPlayerIDList = Object.keys(newNames);
  state.currentPlayerOrder = toFront(
    newPlayerIDList,
    newPlayerIDList.indexOf(maker)
  );

  // Change scores
  const oldScores = state.scores;
  // Score for new players. I am terrible at naming.
  const freshScores = range(state.currentRound - 1).fill(0);
  state.scores = mapValues(newNames, (_: string, ID: string): number[] =>
    ID in oldScores ? oldScores[ID] : freshScores
  );

  // Change bid
  const oldBid = state.bid;
  state.bid = mapValues(newNames, (_: string, ID: string): number =>
    ID in oldBid ? oldBid[ID] : 0
  );

  // Change names field lastly
  state.names = newNames;

  return state;
}
