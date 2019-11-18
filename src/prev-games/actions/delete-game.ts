import { createAction } from "typesafe-actions";
import { ActionTypes } from "../../action-types";

/**
 * Delete a game from previous game state tree in redux.
 * @param index - index of the game in prevGame state desired to delete.
 */
export const deleteGameAction = createAction(
  ActionTypes.DELETE_GAME,
  (index: number) => index
)();
