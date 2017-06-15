// @flow
import type {RootState} from '../types'

export const playerScoresSelector = (state: RootState) =>
  state.currentGame ? state.currentGame.scores : {}
