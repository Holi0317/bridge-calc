// @flow
import {createSelector} from 'reselect'
import mapValues from 'lodash/mapValues'
import sum from 'lodash/sum'
import {playerScoresSelector} from './player-scores'

import type {PlayerMap} from '../types'

export const playerTotalScoreSelector = createSelector(
  playerScoresSelector,
  (scores: PlayerMap<number[]>) => (
    mapValues(scores, score => sum(score))
  )
)
