import {IRootState} from '../../types'
import {GameStage} from '../game-stage'

/**
 * Select currentGame stage.
 * If currentGame is null, null will be selected.
 */
export const stageSelector = (state: IRootState): GameStage | null =>
  state.currentGame ? state.currentGame.stage : null
