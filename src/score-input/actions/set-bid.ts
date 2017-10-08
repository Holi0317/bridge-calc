import {IPlayerMap} from '../../types'

export const SET_BID: 'CURRENT_GAME/SET_BID' = 'CURRENT_GAME/SET_BID'
export interface ISetBidAction {
  type: typeof SET_BID,
  payload: IPlayerMap<number>
}

/**
 * Set the bid property in current game cache.
 * Not to be confused with BID action.
 *
 * @param payload - A map that maps player ID to their bid choice
 */
export function setBid(payload: IPlayerMap<number>): ISetBidAction {
  return {type: SET_BID, payload}
}
