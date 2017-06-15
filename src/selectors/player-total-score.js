// @flow
import {createSelector} from 'reselect'
import mapValues from 'lodash/mapValues'
import sum from 'lodash/sum'
import {playerScoresSelector} from './player-scores'

import type {PlayerMap} from '../types'

/**
 * Select player's total scores.
 * If state is null, empty object will be selected.
 */
export const playerTotalScoreSelector = createSelector(
  playerScoresSelector,
  (scores: PlayerMap<number[]>): PlayerMap<number> => (
    mapValues(scores, score => sum(score))
  )
)
