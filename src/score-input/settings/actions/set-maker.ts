import { createAction } from "typesafe-actions";
import { ActionTypes } from "../../../action-types";

/**
 * Set maker in UI settings UI.
 * This does NOT change anything in currentGame state of our store.
 * @param maker - Player ID of the maker to be set.
 */
export const setMakerAction = createAction(
  ActionTypes.SET_MAKER,
  (maker: string) => maker
)();
