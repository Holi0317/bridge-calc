// @flow
import type {RootState} from '../types'

/**
 * Select currentGame stage.
 * If currentGame is null, null will be selected.
 */
export const stageSelector = (state: RootState) => state.currentGame ? state.currentGame.stage : null
