import { IPlayerMap } from "../../types";
import { ActionTypes } from "../../action-types";

export interface ISetBidAction {
  type: ActionTypes.SET_BID;
  payload: IPlayerMap<number>;
}

/**
 * Set the bid property in current game cache.
 * Not to be confused with BID action.
 *
 * @param payload - A map that maps player ID to their bid choice
 */
export function setBidAction(payload: IPlayerMap<number>): ISetBidAction {
  return { type: ActionTypes.SET_BID, payload };
}
