// @flow
import {GameStage} from '../game-stage'

import type {RootState} from '../types'

export const startTimeSelector = (state: RootState) =>
  state.currentGame ? state.currentGame.startTime : null

export const endTimeSelector = (state: RootState) =>
  (state.currentGame && state.currentGame.stage === GameStage.ended) ? state.currentGame.endTime : null
