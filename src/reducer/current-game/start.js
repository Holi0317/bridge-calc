// @flow
import {GameStage} from '../../game-stage'
import {skip} from './skip'

import type {START_ACTION} from '../../actions/current-game'
import type {WaitingBidState} from './types'

/**
 * Helper function for reducer.
 * Start a new game base on start action parameters.
 * @param action
 */
export function start(action: START_ACTION) {
  // Create an array of playerID -> empty array
  const scores_ = Object.keys(action.playerNames)
    .map(id => ({[id]: []}))

  const firstState: WaitingBidState = {
    stage: GameStage.waitingBid,
    rounds: action.rounds,
    startTime: action.startTime,
    names: action.playerNames,
    scores: Object.assign({}, ...scores_),
    bid: {},
    currentPlayerOrder: Object.keys(action.playerNames),
    currentRound: 1
  }
  return skip(firstState, action.startingRound - 1, action.startTime)
}
