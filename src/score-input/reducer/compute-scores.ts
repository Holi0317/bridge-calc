import { mapValues } from "lodash-es";
import { calculateScore } from "./calculate-score";
import { PlayerMap } from "../../types";

/**
 * Helper function for reducer.
 * Compute new scores object by appending ended round score to the end of each player's score array.
 * @param bids - Player map that maps this round's bid
 * @param wins - Player map that maps this round's win
 * @param scores - Original map that maps player ID to score array. This will NOT be mutated.
 * @returns New score object that maps player id to their score array
 */
export function computeScores(
  bids: PlayerMap<number>,
  wins: PlayerMap<number>,
  scores: PlayerMap<number[]>
) {
  return mapValues(scores, (score, playerID) => {
    const bid = bids[playerID];
    const win = wins[playerID];
    return [...score, calculateScore(bid, win)];
  });
}
