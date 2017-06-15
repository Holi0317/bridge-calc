// @flow
import {createSelector} from 'reselect'
import values from 'lodash/values'
import mapValues from 'lodash/mapValues'
import {playerTotalScoreSelector} from './player-total-score'

import type {PlayerMap} from '../types'

function toOrdinal(value: number): string {
  const suffix = ['th', 'st', 'nd', 'rd']
  const v = value % 100
  return value + (suffix[(v - 20) % 10] || suffix[v] || suffix[0])
}

export const playerRankSelector = createSelector(
  playerTotalScoreSelector,
  (scores: PlayerMap<number[]>) => {
    const sortedScores: number[] = values(scores).sort((a, b) => b - a)
    return mapValues(scores, score => toOrdinal(sortedScores.indexOf(score) + 1))
  }
)
