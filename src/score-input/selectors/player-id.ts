import { createSelector } from "reselect";
import { PlayerMap } from "../../types";
import { namesSelector } from "./names";

/**
 * Select all player ID as an array.
 * If player ID is not available, empty array will be returned
 */
export const playerIDSelector = createSelector(
  namesSelector,
  (names: PlayerMap<string>): string[] => Object.keys(names)
);
