import { ActionTypes } from "../../action-types";
import { createAction } from "typesafe-actions";

/**
 * Skip n round(s).
 * @param times - Number of rounds to be skip.
 */
export const skipAction = createAction(ActionTypes.SKIP, (times: number) => ({
  times,
  date: new Date().getTime()
}))();
