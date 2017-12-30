import {createSelector} from 'reselect'
import {prevGamesSelector} from './prev-games'
import {PrevGameEntry} from '../types'

export const reversedPrevGamesSelector = createSelector(
  prevGamesSelector,
  (prevGames: PrevGameEntry[]): PrevGameEntry[] => {
    const res = prevGames.slice()
    res.reverse()
    return res
  }
)
