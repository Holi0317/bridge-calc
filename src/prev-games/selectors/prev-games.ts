import {IRootState} from '../../types'
import {PrevGameEntry} from '../types'

/**
 * Select all game entries in the redux store.
 */
export function prevGamesSelector(state: IRootState): PrevGameEntry[] {
  return state.prevGames.prevGames
}
