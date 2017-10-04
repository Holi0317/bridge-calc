import {createSelector} from 'reselect'
import values from 'lodash-es/values'
import mapValues from 'lodash-es/mapValues'
import {playerTotalScoreSelector} from './player-total-score'
import {toOrdinal} from '../../utils'
import {IPlayerMap} from '../../types'

/**
 * Select player's ranks. With ordinal suffix.
 */
export const playerRankSelector = createSelector(
  playerTotalScoreSelector,
  (scores: IPlayerMap<number>): IPlayerMap<string> => {
    const sortedScores: number[] = values(scores).sort((a, b) => b - a)
    return mapValues(scores, score => toOrdinal(sortedScores.indexOf(score) + 1))
  }
)