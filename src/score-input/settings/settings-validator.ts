import { createSelector } from "reselect";
import { mapValues } from "lodash-es";
import { namesSelector } from "./selectors/names";
import { dupe, isOk, TranslateData, removeUndef, tData } from "../../utils";
import { PlayerMap } from "../../types";
import { expectedRoundsSelector } from "./selectors/expected-rounds";
import { currentRoundSelector } from "../selectors/current-round";

const playerUpperLimit = 52;

export interface SettingsError {
  /**
   * Error in name input.
   *
   * The following criteria are considered as invalid:
   * - Player name is empty; or
   * - Duplicate player name.
   *
   * The result would be an object with player ID as key and error message
   * as value.
   *
   * If the player's name is valid, the value would be undefined.
   *
   * If all player's name are valid, empty object will be produced.
   */
  names: PlayerMap<TranslateData>;

  /**
   * General error that is not specific to a player.
   *
   * The following circumstances are considered as error:
   * - Too few players (Less than 2); or
   * - Too many players (More than 52); or
   * - The game is unable to continue.
   *
   * Either case, this will contain error message.
   *
   * If there is no error, null will be produced.
   */
  misc: TranslateData | null;
}

function validateNames(names: PlayerMap<string>): PlayerMap<TranslateData> {
  const duplicates = dupe(Object.values(names));

  const res: PlayerMap<TranslateData | null> = mapValues(
    names,
    (name: string) => {
      if (name === "") {
        return tData("Name cannot be empty");
      }
      if (duplicates.includes(name)) {
        return tData("Name cannot be repeated");
      }
      return null;
    }
  );

  return removeUndef(res);
}

function validateMisc(
  names: PlayerMap<string>,
  currentRound: number | null,
  expectedRounds: number
): TranslateData | null {
  // Not in a game currently. This should not happen.
  if (currentRound == null) {
    return null;
  }

  const size = Object.keys(names).length;
  if (size < 2) {
    return tData("At least 2 players is required for a game");
  }
  if (size > playerUpperLimit) {
    return tData("Too many players. Upper limit is {{limit}} players.", {
      limit: playerUpperLimit
    });
  }
  if (expectedRounds < currentRound) {
    return tData("Impossible to continue the game due to too many players");
  }
  return null;
}

/**
 * Validate settings options.
 * If options are valid, an empty object will be returned.
 * Otherwise, an object with property -> error message will be returned.
 */
export const settingsValidator = createSelector(
  namesSelector,
  currentRoundSelector,
  expectedRoundsSelector,
  (
    names: PlayerMap<string>,
    currentRound: number | null,
    expectedRounds: number
  ): SettingsError => ({
    names: validateNames(names),
    misc: validateMisc(names, currentRound, expectedRounds)
  })
);

/**
 * Select validity of settings options.
 * If valid, the selected value will be true.
 */
export const isSettingsValid = createSelector(
  settingsValidator,
  (error: SettingsError): boolean => isOk(error.names) && error.misc === null
);
