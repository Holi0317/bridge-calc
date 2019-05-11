import { ActionTypes } from "../../../action-types";

export interface ISetMakerAction {
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
export function setMakerAction(maker: string): ISetMakerAction {
  return { type: ActionTypes.SET_MAKER, maker };
}
