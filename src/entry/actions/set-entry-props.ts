import { ActionTypes } from "../../action-types";
import { PlayerNameEntry } from "../entry-reducer";

/**
 * Set entry properties on entry reducer.
 *
 * All properties are optional. If they are set, the action will
 * override value on state.
 */
export interface ISetEntryPropsAction {
  type: ActionTypes.SET_ENTRY_PROPS;
  rounds?: number;
  startingRound?: number;
  importOpened?: boolean;
  playerNames?: PlayerNameEntry[];
}

/**
 * Set rounds for entry options.
 *
 * @param rounds - The rounds to be set
 */
export function setRoundsAction(rounds: number): ISetEntryPropsAction {
  return { type: ActionTypes.SET_ENTRY_PROPS, rounds };
}

/**
 * Set starting round for entry options.
 *
 * @param startingRound - The starting round to be set
 */
export function setStartingRoundAction(
  startingRound: number
): ISetEntryPropsAction {
  return { type: ActionTypes.SET_ENTRY_PROPS, startingRound };
}

/**
 * Set import player names open state for entry options.
 *
 * @param importOpened - The state to be set
 */
export function setImportOpenAction(
  importOpened: boolean
): ISetEntryPropsAction {
  return { type: ActionTypes.SET_ENTRY_PROPS, importOpened };
}

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
export function setPlayerNamesAction(
  playerNames: PlayerNameEntry[]
): ISetEntryPropsAction {
  return { type: ActionTypes.SET_ENTRY_PROPS, playerNames };
}
