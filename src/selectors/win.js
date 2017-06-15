// @flow
import {GameStage} from '../game-stage'
import type {PlayerMap, RootState} from '../types'
import {createSelector} from 'reselect'
import mapValues from 'lodash/mapValues'

/**
 * Select win object from current game.
 * If it is not available, empty object will be returned.
 */
export function winSelector(state: RootState): PlayerMap<number> {
  const currentGame = state.currentGame
  if (currentGame && currentGame.stage === GameStage.waitingWin) {
    return currentGame.win
  }
  return {}
}

/**
 * Select string-ed version of win object from current game.
 * Each value are string-ed from original numeric value.
 * If that is not available, empty object will be returned.
 */
export const strWinSelector = createSelector(
  winSelector,
  (win: PlayerMap<number>) =>
    mapValues(win, value => value + '')
)
