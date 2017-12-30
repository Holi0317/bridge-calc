import {ActionTypes} from '../../action-types'

export interface ISetRoundsAction {
  type: ActionTypes.SET_ROUNDS,
  payload: number
}

/**
 * Set rounds for entry options.
 * @param payload - The rounds to be set
 */
export function setRoundsAction(payload: number): ISetRoundsAction {
  return {type: ActionTypes.SET_ROUNDS, payload}
}
