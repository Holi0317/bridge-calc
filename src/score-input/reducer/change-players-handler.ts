import { mapValues, range } from "lodash-es";
import { toEndedState, toWaitingBidState } from "./converter";
import { toFront } from "../../utils";
import { EndedState, WaitingBidState, WaitingWinState } from "./types";
import { PlayerMap } from "../../types";

interface ChangeParam {
  state: WaitingBidState | WaitingWinState;
  newNames: PlayerMap<string>;
  rounds: number;
  maker: string;
  time: number;
}

export function changePlayersHandler({
  state: oldState,
  newNames,
  rounds,
  maker,
  time
}: ChangeParam): WaitingBidState | EndedState {
  if (rounds < oldState.currentRound) {
    // Short circuit. When action.rounds is less than current round

    return {
      ...toEndedState(oldState, time),
      names: newNames,
      rounds,
      scores: mapValues(oldState.scores, (score: number[]) =>
        score.slice(0, rounds)
      )
    };
  }

  const state = toWaitingBidState(oldState);
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
