import { createAction } from "typesafe-actions";
import { randomName } from "../../example-names";
import { ActionTypes } from "../../action-types";
import { cuid } from "../../utils";

/**
 * Add a new player for entry options.
 * @parm name - The name of new player
 */
export const addPlayerAction = createAction(
  ActionTypes.ADD_PLAYER,
  (name: string) => ({
    value: name,
    id: cuid()
  })
)();

/**
 * Add a new player with random name to entry options.
 */
export function addRandomPlayerAction() {
  return addPlayerAction(randomName());
}
