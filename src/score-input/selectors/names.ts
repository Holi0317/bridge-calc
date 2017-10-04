import {IPlayerMap, IRootState} from '../../types'

/**
 * Select names property from current game.
 * If current game is not defined, empty object will be returned
 */
export const namesSelector = (state: IRootState): IPlayerMap<string> =>
  state.currentGame ? state.currentGame.names : {}
