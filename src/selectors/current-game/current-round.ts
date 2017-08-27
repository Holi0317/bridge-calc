import {GameStage} from '../../game-stage'
import {IRootState} from '../../types'

/**
 * Selects currentRound property from current game.
 * If the property does not exists, null will be returned
 */
export function currentRoundSelector(state: IRootState): number | null {
  const currentGame = state.currentGame
  if (currentGame && currentGame.stage !== GameStage.ended) {
    return currentGame.currentRound
  }
  return null
}
