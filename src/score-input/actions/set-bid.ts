import { createAction } from "typesafe-actions";
import { PlayerMap } from "../../types";
import { ActionTypes } from "../../action-types";

/**
 * Set the bid property in current game cache.
 * Not to be confused with BID action.
 *
 * @param payload - A map that maps player ID to their bid choice
 */
export const setBidAction = createAction(
  ActionTypes.SET_BID,
  (payload: PlayerMap<number>) => payload
)();
