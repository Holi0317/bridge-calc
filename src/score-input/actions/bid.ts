import { PlayerMap } from "../../types";
import { ActionTypes } from "../../action-types";

export interface BidAction {
  type: ActionTypes.BID;
  payload?: PlayerMap<number>;
}

/**
 * End bidding process in bridge game
 * @param payload - A map that maps player ID to their bid choice.
 * If undefined, bid property in currentGame state will be used
 */
export function bidAction(payload?: PlayerMap<number>): BidAction {
  return { type: ActionTypes.BID, payload };
}
