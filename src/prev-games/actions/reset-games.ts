import { createAction } from "typesafe-actions";
import { ActionTypes } from "../../action-types";

/**
 * Clear previous games array from redux state tree.
 */
export const resetGamesAtion = createAction(ActionTypes.RESET_GAMES)();
