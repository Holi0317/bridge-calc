import { PlayerMap } from "../../types";
import { ActionTypes } from "../../action-types";

export interface SetBidAction {
  type: ActionTypes.SET_BID;
  payload: PlayerMap<number>;
}

/**
 * Set the bid property in current game cache.
 * Not to be confused with BID action.
 *
 * @param payload - A map that maps player ID to their bid choice
 */
export function setBidAction(payload: PlayerMap<number>): SetBidAction {
  return { type: ActionTypes.SET_BID, payload };
}
