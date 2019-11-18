import { createAction } from "typesafe-actions";
import { PrevGameEntry } from "../types";
import { ActionTypes } from "../../action-types";

/**
 * Push a prevGame entry to the tail of prevGame array in state.
 * @param payload - The prevGame entry
 */
export const addGameAction = createAction(
  ActionTypes.ADD_GAME,
  (payload: PrevGameEntry) => payload
)();
