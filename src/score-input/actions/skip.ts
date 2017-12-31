import {ActionTypes} from '../../action-types'

export interface ISkipAction {
  type: ActionTypes.SKIP,
  times?: number,
  time: Date
}

/**
 * Skip n round(s).
 * @param times - Number of rounds to be skip.
 * If not provided, current round will be skipped.
 */
export function skipAction(times?: number): ISkipAction {
  return {type: ActionTypes.SKIP, times, time: new Date()}
}
