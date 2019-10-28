import { ActionTypes } from "../../action-types";

export interface ToggleDarkAction {
  type: ActionTypes.TOGGLE_DARK;
}

/**
 * Toggle if dark theme should be used or not.
 */
export function toggleDarkAction(): ToggleDarkAction {
  return { type: ActionTypes.TOGGLE_DARK };
}
