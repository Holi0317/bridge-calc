import { createAction } from "typesafe-actions";
import { PlayerMap } from "../../types";
import { ActionTypes } from "../../action-types";

/**
 * Set the win property in current game cache.
 * Not to be confused with WIN action.
 *
 * @param payload - A map that maps player ID to their win choice
 */
export const setWinAction = createAction(
  ActionTypes.SET_WIN,
  (payload: PlayerMap<number>) => payload
)();
