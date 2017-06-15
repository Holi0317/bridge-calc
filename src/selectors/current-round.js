// @flow
import {GameStage} from '../game-stage'

import type {RootState} from '../types'

/**
 * Selects currentRound property from current game.
 * If the property does not exists, null will be returned
 */
export function currentRoundSelector(state: RootState): ?number {
  const currentGame = state.currentGame
  if (currentGame && currentGame.stage !== GameStage.ended) {
    return currentGame.currentRound
  }
  return null
}
