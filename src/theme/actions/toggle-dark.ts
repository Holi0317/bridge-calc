import { ActionTypes } from "../../action-types";

export interface IToggleDarkAction {
  type: ActionTypes.TOGGLE_DARK;
}

/**
 * Toggle if dark theme should be used or not.
 */
export function toggleDarkAction(): IToggleDarkAction {
  return { type: ActionTypes.TOGGLE_DARK };
}
