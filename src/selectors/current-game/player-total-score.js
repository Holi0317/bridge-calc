// @flow
import {createSelector} from 'reselect'
import mapValues from 'lodash-es/mapValues'
import sum from 'lodash-es/sum'
import {playerScoresSelector} from './player-scores'

import type {IPlayerMap} from '../../types'

/**
 * Select player's total scores.
 * If state is null, empty object will be selected.
 */
export const playerTotalScoreSelector = createSelector(
  playerScoresSelector,
  (scores: IPlayerMap<number[]>): IPlayerMap<number> => (
    mapValues(scores, score => sum(score))
  )
)
