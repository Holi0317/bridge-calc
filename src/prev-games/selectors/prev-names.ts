import {createSelector} from 'reselect'
import {PrevGameEntry} from '../types'
import {prevGamesSelector} from './prev-games'

/**
 * Select all names used in previous games
 */
export const prevNamesSelector = createSelector(
  prevGamesSelector,
  (prevGames: PrevGameEntry[]): string[][] =>
    prevGames.map(game => Object.values(game.names))
)
