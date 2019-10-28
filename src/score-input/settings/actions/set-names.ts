import fromPairs from "lodash-es/fromPairs";
import { ActionTypes } from "../../../action-types";
import { PlayerMap } from "../../../types";
import { NameInputEntry } from "../../../name-input-list/types";

export interface SetNamesAction {
  type: ActionTypes.SET_NAMES;
  /**
   * New name map to be set.
   */
  newNames: PlayerMap<string>;
}

/**
 * Set names state in settings UI.
 * This does NOT change anything in currentGame state in the store
 * @param newNames - New name map to be set.
 */
export function setNamesAction(newNames: PlayerMap<string>): SetNamesAction {
  return { type: ActionTypes.SET_NAMES, newNames };
}

export function setNamesFromEntries(
  newNames: NameInputEntry[]
): SetNamesAction {
  const names = newNames.map(entry => [entry.id, entry.value]);
  return { type: ActionTypes.SET_NAMES, newNames: fromPairs(names) };
}
