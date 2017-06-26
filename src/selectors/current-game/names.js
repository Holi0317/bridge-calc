// @flow
import type {PlayerMap, RootState} from '../../types'

/**
 * Select names property from current game.
 * If current game is not defined, empty object will be returned
 */
export const namesSelector = (state: RootState): PlayerMap<string> =>
  state.currentGame ? state.currentGame.names : {}
