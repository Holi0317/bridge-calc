import {EntryActions} from './actions'
import {TOGGLE_OPTION_OPEN} from './actions/toggle-option-open'
import {SET_ROUNDS} from './actions/set-rounds'
import {SET_CARDS} from './actions/set-cards'
import {SET_STARTING_ROUND} from './actions/set-starting-round'
import {ADD_PLAYER} from './actions/add-player'
import {SET_PLAYER_NAMES} from './actions/set-player-names'
import {RESET} from './actions/reset'

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
  case TOGGLE_OPTION_OPEN:
    return {
      ...state,
      optionsOpened: !state.optionsOpened
    }
  case SET_ROUNDS: {
    const startingRound = state.startingRound > action.payload
      ? 1
      : state.startingRound
    return {
      ...state,
      rounds: action.payload,
      startingRound
    }
  }
  case SET_CARDS:
    return {
      ...state,
      cards: action.payload,
      rounds: Math.floor(action.payload / state.playerNames.length)
    }
  case SET_STARTING_ROUND:
    return {
      ...state,
      startingRound: action.payload
    }
  case ADD_PLAYER:
    return playerNameAction(state, [...state.playerNames, action.payload])
  case SET_PLAYER_NAMES:
    return playerNameAction(state, action.payload)
  case RESET:
    return defaultState
  default:
    return state
  }
}
