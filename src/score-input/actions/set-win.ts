import { PlayerMap } from "../../types";
import { ActionTypes } from "../../action-types";

export interface SetWinAction {
  type: ActionTypes.SET_WIN;
  payload: PlayerMap<number>;
}

/**
 * Set the win property in current game cache.
 * Not to be confused with WIN action.
 *
 * @param payload - A map that maps player ID to their win choice
 */
export function setWinAction(payload: PlayerMap<number>): SetWinAction {
  return { type: ActionTypes.SET_WIN, payload };
}
