import { IPlayerMap } from "../../types";
import { ActionTypes } from "../../action-types";

export interface IBidAction {
  type: ActionTypes.BID;
  payload?: IPlayerMap<number>;
}

/**
 * End bidding process in bridge game
 * @param payload - A map that maps player ID to their bid choice.
 * If undefined, bid property in currentGame state will be used
 */
export function bidAction(payload?: IPlayerMap<number>): IBidAction {
  return { type: ActionTypes.BID, payload };
}
