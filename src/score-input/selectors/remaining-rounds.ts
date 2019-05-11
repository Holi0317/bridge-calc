import { createSelector } from "reselect";
import { roundsSelector } from "./rounds";
import { currentRoundSelector } from "./current-round";

/**
 * Calculate number of remaining rounds for the game.
 * If game is null or ended, 0 will be produced.
 */
export const remainingRoundsSelector = createSelector(
  roundsSelector,
  currentRoundSelector,
  (rounds: number | null, currentRound: number | null): number => {
    if (currentRound === null || rounds === null) {
      return 0;
    }
    return rounds - currentRound + 1;
  }
);
