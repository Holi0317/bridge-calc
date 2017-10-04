import {GameStage} from '../game-stage'
import {IPlayerMap, IRootState} from '../../types'
import {createSelector} from 'reselect'
import mapValues from 'lodash-es/mapValues'

/**
 * Select bid object from current game.
 * If it is not available, empty object will be returned.
 */
export function bidSelector(state: IRootState): IPlayerMap<number> {
  const currentGame = state.currentGame
  if (!currentGame || currentGame.stage === GameStage.ended) {
    return {}
  }
  return currentGame.bid
}

/**
 * Select string-ed version of bid object from current game.
 * Each value are string-ed from original numeric value.
 * If that is not available, empty object will be returned.
 */
export const strBidSelector = createSelector(
  bidSelector,
  (bid: IPlayerMap<number>): IPlayerMap<string> =>
    mapValues(bid, value => value + '')
)
