import {createSelector} from 'reselect'
import {prevGamesSelector} from './prev-games'
import {IPrevGameEntry} from '../types'

export const havePrevGamesSelector = createSelector(
  prevGamesSelector,
  (prevGames: IPrevGameEntry[]) => prevGames.length !== 0
)
