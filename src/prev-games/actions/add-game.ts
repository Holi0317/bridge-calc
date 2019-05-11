import { PrevGameEntry } from "../types";
import { ActionTypes } from "../../action-types";

export interface IAddGameAction {
  type: ActionTypes.ADD_GAME;
  payload: PrevGameEntry;
}

/**
 * Push a prevGame entry to the tail of prevGame array in state.
 * @param payload - The prevGame entry
 */
export function addGameAction(payload: PrevGameEntry): IAddGameAction {
  return { type: ActionTypes.ADD_GAME, payload };
}
