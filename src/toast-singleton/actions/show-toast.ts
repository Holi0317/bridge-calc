import { createAction } from "typesafe-actions";
import { ActionTypes } from "../../action-types";

export const showToastAction = createAction(
  ActionTypes.SHOW_TOAST,
  (message: string, autoHideDuration = 3000) => ({ message, autoHideDuration })
)();
