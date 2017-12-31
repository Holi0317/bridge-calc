import {EntryActions} from './actions'
import {ActionTypes} from '../action-types'

export interface IEntryState {
  cards: number,
  rounds: number,
  startingRound: number,
  playerNames: string[],
  optionsOpened: boolean
}

const defaultState: IEntryState = {
  cards: 52,
  optionsOpened: false,
  playerNames: ['John', 'Mary', 'Henry', 'Joe'],
  rounds: 13,
  startingRound: 1
}

/**
 * Action handler for PLAYER_NAMES_SET.
 * Because it is fairly complex, this reducer is moved into a separate function.
 * (I don't want to look at this code with 8 space before each line ._.).
 * See test/entry-reducer.spec.js for expected result on this.
 * @param state - previous state of reducer
 * @param playerNames - New player names passed in as action payload
 */
function playerNameAction(state: IEntryState, playerNames: string[]) {
  const newPlayerNum = playerNames.length
  const newRounds = Math.floor(state.cards / newPlayerNum)
  const playerNum = state.playerNames.length
  const oldRounds = Math.floor(state.cards / playerNum)

  if (newPlayerNum === playerNum) {
    // Rename
    return {
      ...state,
      playerNames
    }
  } else if (newPlayerNum > playerNum) {
    // Add player
    return {
      ...state,
      playerNames,
      rounds: newRounds > state.rounds ? state.rounds : newRounds
    }
  } else {
    // Remove player
    return {
      ...state,
      playerNames,
      rounds: state.rounds === oldRounds ? newRounds : state.rounds
    }
  }
}

export function entryReducer(state: IEntryState = defaultState, action: EntryActions) {
  switch (action.type) {
  case ActionTypes.TOGGLE_OPTION_OPEN:
    return {
      ...state,
      optionsOpened: !state.optionsOpened
    }
  case ActionTypes.SET_ROUNDS: {
    const startingRound = state.startingRound > action.payload
      ? 1
      : state.startingRound
    return {
      ...state,
      rounds: action.payload,
      startingRound
    }
  }
  case ActionTypes.SET_CARDS:
    return {
      ...state,
      cards: action.payload,
      rounds: Math.floor(action.payload / state.playerNames.length)
    }
  case ActionTypes.SET_STARTING_ROUND:
    return {
      ...state,
      startingRound: action.payload
    }
  case ActionTypes.ADD_PLAYER:
    return playerNameAction(state, [...state.playerNames, action.payload])
  case ActionTypes.SET_PLAYER_NAMES:
    return playerNameAction(state, action.payload)
  case ActionTypes.RESET_ENTRY:
    return defaultState
  default:
    return state
  }
}
