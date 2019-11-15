import { createAction } from "typesafe-actions";
import { ActionTypes } from "../../../action-types";
import { randomName } from "../../../example-names";
import { cuid } from "../../../utils";

/**
 * Add a name to settings UI state and append to the end of the list.
 * This does NOT change currentGame state in the store.
 * @param name - Name of the new Player
 */
export const addNameAction = createAction(
  ActionTypes.ADD_NAME,
  (name: string) => ({ name, id: cuid() })
)();

/**
 * Add a random name to UI state and append to the end of the list
 */
export function addRandomNameAction() {
  return addNameAction(randomName());
}
