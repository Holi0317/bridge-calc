import fromPairs from "lodash-es/fromPairs";
import { ActionTypes } from "../../../action-types";
import { IPlayerMap } from "../../../types";
import { NameInputEntry } from "../../../name-input-list/types";

export interface ISetNamesAction {
  type: ActionTypes.SET_NAMES;
  /**
   * New name map to be set.
   */
  newNames: IPlayerMap<string>;
}

/**
 * Set names state in settings UI.
 * This does NOT change anything in currentGame state in the store
 * @param newNames - New name map to be set.
 */
export function setNamesAction(newNames: IPlayerMap<string>): ISetNamesAction {
  return { type: ActionTypes.SET_NAMES, newNames };
}

export function setNamesFromEntries(
  newNames: NameInputEntry[]
): ISetNamesAction {
  const names = newNames.map(entry => [entry.id, entry.value]);
  return { type: ActionTypes.SET_NAMES, newNames: fromPairs(names) };
}
