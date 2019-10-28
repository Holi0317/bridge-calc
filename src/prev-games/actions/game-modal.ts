import { ActionTypes } from "../../action-types";

export interface SetGameModalAction {
  type: ActionTypes.SET_GAME_MODAL;
  index: number | null;
}

/**
 * Set a game modal to display
 * @param index Index of the game entry in the prevGames array
 */
export function showGameModalAction(index: number): SetGameModalAction {
  return { type: ActionTypes.SET_GAME_MODAL, index };
}

/**
 * Close game modals
 */
export function closeGameModalAction(): SetGameModalAction {
  return { type: ActionTypes.SET_GAME_MODAL, index: null };
}
