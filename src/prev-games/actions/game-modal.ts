import { createAction } from "typesafe-actions";
import { ActionTypes } from "../../action-types";

/**
 * Set a game modal to display
 * @param index Index of the game entry in the prevGames array
 */
export const showGameModalAction = createAction(
  ActionTypes.SET_GAME_MODAL,
  (index: number | null) => index
)();

/**
 * Close game modals
 */
export function closeGameModalAction() {
  return showGameModalAction(null);
}
