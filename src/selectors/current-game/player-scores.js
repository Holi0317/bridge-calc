// @flow
import type {IPlayerMap, RootState} from '../../types'

/**
 * Select all player's scores.
 * Empty object will be produced for null state
 */
export const playerScoresSelector = (state: RootState): IPlayerMap<number[]> =>
  state.currentGame ? state.currentGame.scores : {}
