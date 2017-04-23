// @flow
import mapValues from 'lodash.mapvalues'
import {toFront} from '../utils'
import {START, SKIP, SET_BID, BID, SET_WIN, WIN} from '../actions/current-game'
import {gameStage} from '../game-stage'

import type {GameStage} from '../game-stage'
import type {CurrentGameActions, WIN_ACTION} from '../actions/current-game'

/**
 * States that must have regardless of current stage.
 * (Except the stage property)
 */
type BaseGameState = {
  stage: GameStage,
  /** Number of rounds for this game */
  rounds: number,
  /** The time that game has started */
  startTime: Date,

  /** Player name map */
  names: {[playerID: string]: string},
  /** Player score map */
  scores: {[playerID: string]: number[]}
}

type WaitingBidState = BaseGameState & {
  stage: gameStage.waitingBid,
  /** Current bid */
  bid: {[playerID: string]: number},
  /** Order of players for current round */
  currentPlayerOrder: string[],
  /** Current round */
  currentRound: number
}

type WaitingWinState = BaseGameState & {
  stage: gameStage.waitingWin,
  /** Current bid */
  bid: {[playerID: string]: number},
  /** Current win */
  win: {[playerID: string]: number},
  /** Order of players for current round */
  currentPlayerOrder: string[],
  /** Current round */
  currentRound: number
}

type EndedState = BaseGameState & {
  stage: gameStage.ended,
  endTime: Date
}

export type GameState =
  | WaitingBidState
  | WaitingWinState
  | EndedState
  | null

const defaultState: GameState = null

/**
 * Skip n round(s) of game.
 */
function skip(state: GameState, n: number, time: Date): WaitingWinState | EndedState | null {
  if (state === null) {
    return null
  }
  delete state.win  // Change the state to WaitingWinState
  if (n === 0) {
    if (state.currentRound === state.rounds) {
      // Last round
      const newState = {
        ...state,
        stage: gameStage.ended,
        endTime: time
      }
      delete newState.win
      delete newState.bid
      delete newState.currentPlayerOrder
      delete newState.currentRound
      return newState
    } else {
      return state
    }
  }
  const newState = {
    ...state,
    stage: gameStage.waitingBid,
    bid: {},
    scores: mapValues(state.scores, score => [...score, 0]),
    currentPlayerOrder: toFront(state.currentPlayerOrder, 1),
    currentRound: state.currentRound + 1
  }
  return skip(newState, n - 1, time)
}

/**
 * Calculate score of this round from given parameters.
 *
 * @param bid - Number of bid stack given
 * @param win - Number of win gain stack
 * @return Score of the player at that round
 */
function calculateScore(bid: number, win: number): number {
  if (bid === win) {
    return (bid) ** 2 + 10
  } else {
    return -((win - bid) ** 2)
  }
}

function computeScores(bids, wins, scores) {
  return mapValues(scores, (score, playerID) => {
    const bid = bids[playerID]
    const win = wins[playerID]
    return [...score, calculateScore(bid, win)]
  })
}

/**
 * Handler for WIN action
 */
function winHandler(state: WaitingWinState, action: WIN_ACTION): GameState {
  if (state.rounds === state.currentRound) {
    // Last round
    const newState = {
      ...state,
      stage: gameStage.ended,
      scores: computeScores(state.bid, action.win, state.scores),
      endTime: action.time
    }
    delete newState.bid
    delete newState.win
    delete newState.currentPlayerOrder
    delete newState.currentRound
    return newState
  } else {
    const newState = {
      ...state,
      stage: gameStage.waitingBid,
      bid: {},
      currentRound: state.currentRound + 1,
      currentPlayerOrder: toFront(state.currentPlayerOrder, 1),
      scores: computeScores(state.bid, action.win, state.scores)
    }
    delete newState.win
    return newState
  }
}

export function currentGame(state: GameState = defaultState, action: CurrentGameActions): GameState {
  if (action.type === START) {
    // Only this action will always return a new state, ignoring the original state
    const scores_ = Object.keys(action.playerNames)
      .map(id => ({[id]: []}))
    const firstState = {
      stage: gameStage.waitingBid,
      rounds: action.rounds,
      startTime: action.startTime,
      names: action.playerNames,
      scores: Object.assign({}, ...scores_),
      bid: {},
      win: {},
      currentPlayerOrder: Object.keys(action.playerNames),
      currentRound: 1
    }
    return skip(firstState, action.startingRound - 1, action.startTime)
  } else if (state === null) {
    // Prevent any other action when game is not initialized
    return null
  } else if (state.stage === gameStage.ended) {
    // Ended game is read only. No action can mutate it
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
      ...state,
      win: action.payload
    }
  case BID:
    return {
      ...state,
      stage: gameStage.waitingWin,
      bid: action.payload,
      win: {}
    }
  case WIN:
    return winHandler(state, action)
  default:
    return state
  }
}
