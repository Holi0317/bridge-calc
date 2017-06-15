// @flow
import type {RootState} from '../types'

/**
 * Selects rounds property from current game.
 * If the property does not exists, null will be returned
 */
export const roundsSelector = (state: RootState): ?number =>
  state.currentGame ? state.currentGame.rounds : null
