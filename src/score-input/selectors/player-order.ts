import {GameStage} from '../game-stage'
import {IRootState} from '../../types'

/**
 * Select currentPlayerOrder property from current game state.
 * If it does not exist, empty array will be returned.
 */
export function playerOrderSelector(state: IRootState): string[] {
  const currentGame = state.currentGame
  if (!currentGame || currentGame.stage === GameStage.ended) {
    return []
  }
  return currentGame.currentPlayerOrder
}
