import { ActionTypes } from "../../action-types";

export interface IUndoAction {
  type: ActionTypes.UNDO;
}

/**
 * Roll back from waitingWin stage to waitingBid stage.
 * If the stage is not waitingWin, no-op will be done.
 */
export function undoAction(): IUndoAction {
  return { type: ActionTypes.UNDO };
}
