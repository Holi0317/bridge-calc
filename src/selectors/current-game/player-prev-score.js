// @flow
import {createSelector} from 'reselect'
import mapValues from 'lodash-es/mapValues'
import last from 'lodash-es/last'
import {playerScoresSelector} from './player-scores'

import type {IPlayerMap} from '../../types'

/**
 * Select previous score of all players.
 * If state is null, empty object will be selected
 */
export const playerPrevScoreSelector = createSelector(
  playerScoresSelector,
  (scores: IPlayerMap<number[]>): IPlayerMap<number> =>
    mapValues(scores, score => last(score) || 0)
)
