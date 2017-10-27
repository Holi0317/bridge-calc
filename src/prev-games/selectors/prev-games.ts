import {IRootState} from '../../types'

export function prevGamesSelector(state: IRootState) {
  return state.prevGames.prevGames
}
