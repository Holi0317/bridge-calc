import { createSelector } from "reselect";
import { namesSelector } from "./names";
import { PlayerMap } from "../../../types";

/**
 * Calculate maximum possible rounds for current number of players in game settings.
 * If it is impossible to play at least 1 round (too many or too few people), this will produce 0.
 */
export const expectedRoundsSelector = createSelector(
  namesSelector,
  (names: PlayerMap<string>): number => {
    const length = Object.keys(names).length;
    if (length < 2 || length > 52) {
      return 0;
    }
    return Math.floor(52 / length);
  }
);
