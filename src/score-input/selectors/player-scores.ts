import {IPlayerMap, IRootState} from '../../types'

/**
 * Select all player's scores.
 * Empty object will be produced for null state
 */
export const playerScoresSelector = (state: IRootState): IPlayerMap<number[]> =>
  state.currentGame ? state.currentGame.scores : {}
