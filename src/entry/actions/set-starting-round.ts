import {ActionTypes} from '../../action-types'

export interface ISetStartingRoundAction {
  type: ActionTypes.SET_STARTING_ROUND,
  payload: number
}

/**
 * Set starting round for entry options.
 * @param payload - The starting round to be set
 */
export function setStartingRoundAction(payload: number): ISetStartingRoundAction {
  return {type: ActionTypes.SET_STARTING_ROUND, payload}
}
