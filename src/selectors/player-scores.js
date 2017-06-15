// @flow
import type {PlayerMap, RootState} from '../types'

/**
 * Select all player's scores.
 * Empty object will be produced for null state
 */
export const playerScoresSelector = (state: RootState): PlayerMap<number[]> =>
  state.currentGame ? state.currentGame.scores : {}
