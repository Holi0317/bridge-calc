import {IRootState} from '../../types'
import {PrevGameEntry} from '../types'

export function prevGamesSelector(state: IRootState): PrevGameEntry[] {
  return state.prevGames.prevGames
}
