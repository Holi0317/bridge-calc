import { ActionTypes } from "../../action-types";

export interface CloseToastAction {
  type: ActionTypes.CLOSE_TOAST;
}

export function closeToastAction(): CloseToastAction {
  return { type: ActionTypes.CLOSE_TOAST };
}
