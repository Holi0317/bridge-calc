import { createSelector } from "reselect";
import { dupe, removeUndef, isOk, TranslateData, tData } from "../utils";
import { RootState } from "../types";
import { PlayerNameEntry } from "./entry-reducer";

const playerUpperLimit = 52;

export interface EntryError {
  /**
   * Error that should be shown in the corresponding index of player.
   *
   * If the result is null, the player does not have any issue with his/her name.
   *
   * If all players have valid name, this property would be undefined then.
   *
   * Valid here means meeting the following criteria:
   * - Name are not empty string; and
   * - Does not have duplicate names
   *
   * Do note that the name " " (a space) is accepted.
   */
  playerNames?: (TranslateData | null)[];

  /**
   * Error on other issues that is not specific to a player, but to the game.
   *
   * Valid here means meeting the following criteria:
   * - There are at least 2 players; and
   * - Less than or equal to 52 players.
   */
  misc?: TranslateData;
}

function validateMisc(playerNames: string[]): TranslateData | null {
  if (playerNames.length < 2) {
    return tData("At least 2 players is required for a game")!;
  } else if (playerNames.length > playerUpperLimit) {
    return tData("Too many players. Upper limit is {{limit}} players.", {
      limit: playerUpperLimit
    })!;
  }
  return null;
}

function validatePlayerName(
  rawNames: string[]
): (TranslateData | null)[] | null {
  const duplicates = dupe(rawNames);
  const playerNames = rawNames.map(p =>
    p == null || p === ""
      ? tData("Name cannot be empty")
      : duplicates.includes(p)
      ? tData("Name cannot be repeated")
      : null
  );
  const isEmpty = playerNames.filter(p => p != null).length === 0;
  return isEmpty ? null : playerNames;
}

/**
 * Validate entry options.
 * If options are valid, an empty object will be returned.
 * Otherwise, an object with property -> error message will be returned.
 * See `isEntryOptionsValid` to check if there is any error during validation process.
 */
export const entryOptionsValidator = createSelector(
  (state: RootState) => state.entry.playerNames,
  (playerNames: readonly PlayerNameEntry[]): EntryError => {
    const names = playerNames.map(entry => entry.value);

    const res = {
      misc: validateMisc(names),
      playerNames: validatePlayerName(names)
    };
    return removeUndef(res);
  }
);

/**
 * Select validity of entry options.
 * If valid, the selected value will be true.
 */
export const isEntryOptionsValid = createSelector(
  entryOptionsValidator,
  isOk
);
