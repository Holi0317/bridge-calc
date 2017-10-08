import {IPlayerMap} from '../../types'

export const BID: 'CURRENT_GAME/BID' = 'CURRENT_GAME/BID'
export interface IBidAction {
  type: typeof BID,
  payload?: IPlayerMap<number>
}

/**
 * End bidding process in bridge game
 * @param payload - A map that maps player ID to their bid choice.
 * If undefined, bid property in currentGame state will be used
 */
export function bid(payload?: IPlayerMap<number>): IBidAction {
  return {type: BID, payload}
}
