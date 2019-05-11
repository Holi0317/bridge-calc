import { GameState } from "../../score-input/reducer";
import { PrevGameEntry } from "../types";
import { gameStateToPrevGame } from "../converter";
import { ActionTypes } from "../../action-types";

export interface ISaveGameAction {
  type: ActionTypes.SAVE_GAME;
  /**
   * Content of the game to be saved.
   * If undefined, no-op will be done (as to handle null in GameState).
   */
  entry: PrevGameEntry | null;
}

/**
 * Save current game to prevGame state.
 * If the game already exist, this will change the content of the game in state.
 * Otherwise, the game will be appended to the last element of the array in the list state.
 * If given state is null, no-op will happen.
 * @param state - Game state to be saved
 */
export function saveGameAction(state: GameState): ISaveGameAction {
  if (state == null) {
    return { type: ActionTypes.SAVE_GAME, entry: null };
  }
  return { type: ActionTypes.SAVE_GAME, entry: gameStateToPrevGame(state) };
}
