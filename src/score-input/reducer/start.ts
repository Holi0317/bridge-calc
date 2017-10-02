import {GameStage} from '../game-stage'
import {skip} from './skip'
import {bidWinGenerator} from './bid-win-generator'
import {fillObj} from '../../utils'

import {IStartAction} from '../../actions/current-game'
import {IWaitingBidState} from './types'

/**
 * Helper function for reducer.
 * Start a new game base on start action parameters.
 * @param action
 */
export function start(action: IStartAction) {
  const playerIDs = Object.keys(action.playerNames)

  const firstState: IWaitingBidState = {
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
