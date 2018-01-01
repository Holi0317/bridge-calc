import {IRootState} from '../types'
import {GameStage} from '../score-input/game-stage'

export function showContinueSelector({currentGame}: IRootState): boolean {
  return !!(currentGame && currentGame.stage !== GameStage.ended)
}
