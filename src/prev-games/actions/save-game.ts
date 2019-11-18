import { createAction } from "typesafe-actions";
import { GameState } from "../../score-input/reducer";
import { gameStateToPrevGame } from "../converter";
import { ActionTypes } from "../../action-types";

/**
 * Save current game to prevGame state.
 * If the game already exist, this will change the content of the game in state.
 * Otherwise, the game will be appended to the last element of the array in the list state.
 * If given state is null, no-op will happen.
 * @param state - Game state to be saved
 */
export const saveGameAction = createAction(
  ActionTypes.SAVE_GAME,
  (state: GameState) => (state == null ? null : gameStateToPrevGame(state))
)();
