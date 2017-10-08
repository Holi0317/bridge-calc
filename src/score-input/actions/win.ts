import {IPlayerMap} from '../../types'

export const WIN: 'CURRENT_GAME/WIN' = 'CURRENT_GAME/WIN'
export interface IWinAction {
  type: typeof WIN,
  win?: IPlayerMap<number>,
  time: Date
}

/**
 * End winning process in bridge game.
 * I.e. End one round
 *
 * @param win - A map that maps player ID to their win choice.
 * If this is not defined, win property in currentGame state will be used as fallback.
 */
export function win(win?: IPlayerMap<number>): IWinAction {
  return {type: WIN, win, time: new Date()}
}
