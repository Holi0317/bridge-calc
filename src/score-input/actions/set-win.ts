import {IPlayerMap} from '../../types'

export const SET_WIN: 'CURRENT_GAME/SET_WIN' = 'CURRENT_GAME/SET_WIN'
export interface ISetWinAction {
  type: typeof SET_WIN,
  payload: IPlayerMap<number>
}

/**
 * Set the win property in current game cache.
 * Not to be confused with WIN action.
 *
 * @param payload - A map that maps player ID to their win choice
 */
export function setWin(payload: IPlayerMap<number>): ISetWinAction {
  return {type: SET_WIN, payload}
}
