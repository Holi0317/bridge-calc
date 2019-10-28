import { ActionTypes } from "../../../action-types";

export interface SetMakerAction {
  type: ActionTypes.SET_MAKER;
  /**
   * The Player ID of maker to be set.
   */
  maker: string;
}

/**
 * Set maker in UI settings UI.
 * This does NOT change anything in currentGame state of our store.
 * @param maker - Player ID of the maker to be set.
 */
export function setMakerAction(maker: string): SetMakerAction {
  return { type: ActionTypes.SET_MAKER, maker };
}
