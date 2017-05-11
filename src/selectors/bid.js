// @flow
import {GameStage} from '../game-stage'
import type {PlayerMap, RootState} from '../types'
import {createSelector} from 'reselect'
import mapValues from 'lodash/mapValues'

/**
 * Select bid object from current game.
 * If it is not available, empty object will be returned.
 */
export function bidSelector(state: RootState): PlayerMap<number> {
  if (!state.currentGame || state.currentGame.stage === GameStage.ended) {
    return {}
  }
  return state.currentGame.bid
}

/**
 * Select string-ed version of bid object from current game.
 * Each value are string-ed from original numeric value.
 * If that is not available, empty object will be returned.
 */
export const strBidSelector = createSelector(
  bidSelector,
  (bid: PlayerMap<number>) => mapValues(bid, value => value + '')
)
