import { ActionTypes } from "../../action-types";

export interface IShowToastAction {
  type: ActionTypes.SHOW_TOAST;
  message: string;
  autoHideDuration: number;
}

export function showToastAction(
  message: string,
  autoHideDuration = 3000
): IShowToastAction {
  return { type: ActionTypes.SHOW_TOAST, message, autoHideDuration };
}
