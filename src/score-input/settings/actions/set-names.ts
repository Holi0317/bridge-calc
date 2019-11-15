import { createAction } from "typesafe-actions";
import fromPairs from "lodash-es/fromPairs";
import { ActionTypes } from "../../../action-types";
import { PlayerMap } from "../../../types";
import { NameInputEntry } from "../../../name-input-list/types";

/**
 * Set names state in settings UI.
 * This does NOT change anything in currentGame state in the store
 * @param newNames - New name map to be set.
 */
export const setNamesAction = createAction(
  ActionTypes.SET_NAMES,
  (newNames: PlayerMap<string>) => newNames
)();

/**
 * Convert NameInputEntry to PlayerMap then create setNames action
 */
export function setNamesFromEntries(newNames: NameInputEntry[]) {
  const names = newNames.map(entry => [entry.id, entry.value]);
  return setNamesAction(fromPairs(names));
}
