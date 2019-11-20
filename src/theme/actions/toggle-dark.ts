import { createAction } from "typesafe-actions";
import { ActionTypes } from "../../action-types";

/**
 * Toggle if dark theme should be used or not.
 */
export const toggleDarkAction = createAction(ActionTypes.TOGGLE_DARK)();
