// @flow
import {GameStage} from '../../game-stage'
import {skip} from './skip'
import {bidWinGenerator} from './bid-win-generator'
import {fillObj} from '../../utils'

import type {START_ACTION} from '../../actions/current-game'
import type {WaitingBidState} from './types'

/**
 * Helper function for reducer.
 * Start a new game base on start action parameters.
 * @param action
 */
export function start(action: START_ACTION) {
  const playerIDs = Object.keys(action.playerNames)

  const firstState: WaitingBidState = {
    stage: GameStage.waitingBid,
    rounds: action.rounds,
    startTime: action.startTime,
    names: action.playerNames,
    scores: fillObj({}, playerIDs, []),
    bid: bidWinGenerator(playerIDs),
    currentPlayerOrder: playerIDs,
    currentRound: 1
  }
  return skip(firstState, action.startingRound - 1, action.startTime)
}
