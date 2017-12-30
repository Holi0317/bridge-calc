import {GameStage} from '../game-stage'
import {skip} from './skip'
import {start} from './start'
import {winHandler} from './win-handler'
import {changePlayersHandler} from './change-players-handler'
import {toWaitingBidState, toWaitingWinState} from './converter'
import {bidWinGenerator} from './bid-win-generator'
import {GameState} from './types'
import {CurrentGameActions} from '../actions'
import {SKIP} from '../actions/skip'
import {SET_BID} from '../actions/set-bid'
import {SET_WIN} from '../actions/set-win'
import {BID} from '../actions/bid'
import {WIN} from '../actions/win'
import {UNDO} from '../actions/undo'
import {CHANGE_PLAYERS} from '../actions/change-players'
import {START} from '../actions/start'
import {REPLACE_CURRENT_GAME} from '../actions/replace-current-game'

const defaultState: GameState = null

export function currentGameReducer(state: GameState = defaultState, action: CurrentGameActions): GameState {
  if (action.type === START) {
    // START action will always return a new state, ignoring the original state
    return start(action)
  }
  if (action.type === REPLACE_CURRENT_GAME) {
    // REPLACE_CURRENT_GAME ignores all safety check
    return action.payload
  }
  if (state == null) {
    // Prevent any other action when game is not initialized
    return null
  }
  if (state.stage === GameStage.ended) {
    // Ended game is read only. No action other than START can mutate it.
    return state
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
      ...toWaitingWinState(state),
      win: action.payload
    }
  case BID:
    return {
      ...state,
      stage: GameStage.waitingWin,
      bid: action.payload || state.bid,
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
