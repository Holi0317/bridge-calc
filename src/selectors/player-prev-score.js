// @flow
import {createSelector} from 'reselect'
import mapValues from 'lodash/mapValues'
import last from 'lodash/last'
import {playerScoresSelector} from './player-scores'

import type {PlayerMap} from '../types'

export const playerPrevScoreSelector = createSelector(
  playerScoresSelector,
  (scores: PlayerMap<number[]>) => (
    mapValues(scores, score => last(score) || 0)
  )
)
