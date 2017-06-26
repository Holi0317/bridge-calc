// @flow
import {GameStage} from '../../game-stage'

import type {RootState} from '../../types'

/**
 * Select starting time of current game.
 * If that is not defined, null will be selected.
 */
export const startTimeSelector = (state: RootState): ?Date =>
  state.currentGame ? state.currentGame.startTime : null

/**
 * Select ending time of current game.
 * If that is not defined, null will be selected.
 */
export const endTimeSelector = (state: RootState): ?Date =>
  (state.currentGame && state.currentGame.stage === GameStage.ended) ? state.currentGame.endTime : null
