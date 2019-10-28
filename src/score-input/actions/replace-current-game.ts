import { GameState } from "../reducer";
import { ActionTypes } from "../../action-types";

export interface ReplaceCurrentGameAction {
  type: ActionTypes.REPLACE_CURRENT_GAME;
  payload: GameState;
}

export function replaceCurrentGameAction(
  payload: GameState
): ReplaceCurrentGameAction {
  return { type: ActionTypes.REPLACE_CURRENT_GAME, payload };
}
