import { createAction } from "typesafe-actions";
import { PlayerMap } from "../../types";
import { ActionTypes } from "../../action-types";

/**
 * End bidding process in bridge game
 * @param payload - A map that maps player ID to their bid choice.
 * If undefined, bid property in currentGame state will be used
 */
export const bidAction = createAction(
  ActionTypes.BID,
  (payload?: PlayerMap<number>) => payload
)();
