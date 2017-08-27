// @flow
import type {IPlayerMap, RootState} from '../../types'

/**
 * Select names property from current game.
 * If current game is not defined, empty object will be returned
 */
export const namesSelector = (state: RootState): IPlayerMap<string> =>
  state.currentGame ? state.currentGame.names : {}
