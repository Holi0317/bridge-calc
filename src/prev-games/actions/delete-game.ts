import { ActionTypes } from "../../action-types";

export interface DeleteGameAction {
  type: ActionTypes.DELETE_GAME;
  index: number;
}

/**
 * Delete a game from previous game state tree in redux.
 * @param index - index of the game in prevGame state desired to delete.
 */
export function deleteGameAction(index: number): DeleteGameAction {
  return { type: ActionTypes.DELETE_GAME, index };
}
