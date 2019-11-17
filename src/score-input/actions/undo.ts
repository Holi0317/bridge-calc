import { createAction } from "typesafe-actions";
import { ActionTypes } from "../../action-types";

/**
 * Roll back from waitingWin stage to waitingBid stage.
 * If the stage is not waitingWin, no-op will be done.
 */
export const undoAction = createAction(ActionTypes.UNDO)();
