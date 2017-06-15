// @flow
import {createSelector} from 'reselect'
import mapValues from 'lodash/mapValues'
import last from 'lodash/last'
import {playerScoresSelector} from './player-scores'

import type {PlayerMap} from '../types'

/**
 * Select previous score of all players.
 * If state is null, empty object will be selected
 */
export const playerPrevScoreSelector = createSelector(
  playerScoresSelector,
  (scores: PlayerMap<number[]>): PlayerMap<number> =>
    mapValues(scores, score => last(score) || 0)
)
