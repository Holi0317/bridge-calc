import { createAction } from "typesafe-actions";
import { ActionTypes } from "../../action-types";

export const closeToastAction = createAction(ActionTypes.CLOSE_TOAST)();
