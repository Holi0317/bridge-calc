import {ActionTypes} from '../../action-types'

export interface ISetCardsAction {
  type: ActionTypes.SET_CARDS,
  payload: number
}

/**
 * Set number of cards for entry options.
 * @param payload - The number of cards to be set
 */
export function setCardsAction(payload: number): ISetCardsAction {
  return {type: ActionTypes.SET_CARDS, payload}
}
