import {IPlayerMap} from '../../types'
import {ActionTypes} from '../../action-types'

export interface ISetWinAction {
  type: ActionTypes.SET_WIN,
  payload: IPlayerMap<number>
}

/**
 * Set the win property in current game cache.
 * Not to be confused with WIN action.
 *
 * @param payload - A map that maps player ID to their win choice
 */
export function setWinAction(payload: IPlayerMap<number>): ISetWinAction {
  return {type: ActionTypes.SET_WIN, payload}
}
