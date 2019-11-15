import { ActionTypes } from "../../action-types";
import { PlayerNameEntry } from "../entry-reducer";
import { createAction } from "typesafe-actions";

/**
 * Set rounds for entry options.
 *
 * @param rounds - The rounds to be set
 */
export const setRoundsAction = createAction(
  ActionTypes.SET_ENTRY_PROPS,
  (rounds: number) => ({ rounds })
)();

/**
 * Set starting round for entry options.
 *
 * @param startingRound - The starting round to be set
 */
export const setStartingRoundAction = createAction(
  ActionTypes.SET_ENTRY_PROPS,
  (startingRound: number) => ({ startingRound })
)();

/**
 * Set import player names open state for entry options.
 *
 * @param importOpened - The state to be set
 */
export const setImportOpenAction = createAction(
  ActionTypes.SET_ENTRY_PROPS,
  (importOpened: boolean) => ({ importOpened })
)();

/**
 * Set player names that will be in the game for entry options.
 *
 * This action replaces old player names array with new one.
 * This can handle change, add and delete operations.
 *
 * For appending one player only, action ENTRY/ADD_PLAYER can be used.
 *
 * @param playerNames - The array of player names to be replaced
 */
export const setPlayerNamesAction = createAction(
  ActionTypes.SET_ENTRY_PROPS,
  (playerNames: PlayerNameEntry[]) => ({ playerNames })
)();
