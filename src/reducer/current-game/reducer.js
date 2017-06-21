// @flow
import {START, SKIP, SET_BID, BID, SET_WIN, WIN, UNDO, CHANGE_PLAYERS} from '../../actions/current-game'
import {GameStage} from '../../game-stage'
import {skip} from './skip'
import {start} from './start'
import {winHandler} from './win-handler'
import {changePlayersHandler} from './change-players-handler'
import {toWaitingBidState} from './converter'
import {bidWinGenerator} from './bid-win-generator'

import type {EndedState, GameState, WaitingBidState} from './types'
import type {CurrentGameActions} from '../../actions/current-game'

const defaultState: GameState = null

export function currentGame(state: GameState = defaultState, action: CurrentGameActions): GameState {
  if (action.type === START) {
    // Only START action will always return a new state, ignoring the original state
    return start(action)
  }
  if (state == null) {
    // Prevent any other action when game is not initialized
    return null
  }
  if (state.stage === GameStage.ended) {
    // Ended game is read only. No action other than START can mutate it.
    return (state: EndedState)
  }

  switch (action.type) {
  case SKIP:
    return skip(state, action.times || 1, action.time)
  case SET_BID:
    return {
      ...state,
      bid: action.payload
    }
  case SET_WIN:
    return {
      ...state,
      win: action.payload
    }
  case BID:
    return {
      ...state,
      stage: GameStage.waitingWin,
      bid: action.payload || (state: WaitingBidState).bid,
      win: bidWinGenerator(Object.keys(state.names))
    }
  case WIN:
    return winHandler(state, action)
  case UNDO:
    if (state.stage === GameStage.waitingBid) {
      return state
    }
    return toWaitingBidState(state)
  case CHANGE_PLAYERS:
    return changePlayersHandler(state, action)
  default:
    return state
  }
}
