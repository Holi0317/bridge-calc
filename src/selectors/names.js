// @flow
import type {RootState} from '../types'

/**
 * Select names property from current game.
 * If current game is not defined, empty object will be returned
 */
export const namesSelector = (state: RootState) => state.currentGame ? state.currentGame.names : {}