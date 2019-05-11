import { ActionTypes } from "../../action-types";

export interface ISkipAction {
  type: ActionTypes.SKIP;
  times: number;
  time: number;
}

/**
 * Skip n round(s).
 * @param times - Number of rounds to be skip.
 */
export function skipAction(times: number): ISkipAction {
  return { type: ActionTypes.SKIP, times, time: new Date().getTime() };
}
