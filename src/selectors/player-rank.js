// @flow
import {createSelector} from 'reselect'
import values from 'lodash/values'
import mapValues from 'lodash/mapValues'
import {playerTotalScoreSelector} from './player-total-score'
import {toOrdinal} from '../utils'

import type {PlayerMap} from '../types'

/**
 * Select player's ranks. With ordinal suffix.
 */
export const playerRankSelector = createSelector(
  playerTotalScoreSelector,
  (scores: PlayerMap<number[]>): PlayerMap<string> => {
    const sortedScores: number[] = values(scores).sort((a, b) => b - a)
    return mapValues(scores, score => toOrdinal(sortedScores.indexOf(score) + 1))
  }
)
