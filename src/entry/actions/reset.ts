import { ActionTypes } from "../../action-types";
import { createAction } from "typesafe-actions";

/**
 * Reset state to default one.
 */
export const resetAction = createAction(ActionTypes.RESET_ENTRY)();
