import {GameStage} from '../../score-input/game-stage'
import {IPlayerMap, IRootState} from '../../types'
import {createSelector} from 'reselect'
import mapValues from 'lodash-es/mapValues'

/**
 * Select win object from current game.
 * If it is not available, empty object will be returned.
 */
export function winSelector(state: IRootState): IPlayerMap<number> {
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
  (win: IPlayerMap<number>) =>
    mapValues(win, value => value + '')
)
