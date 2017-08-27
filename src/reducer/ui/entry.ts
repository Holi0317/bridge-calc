import {EntryActions, OPTION_OPEN_TOGGLE, ROUNDS_SET, CARDS_SET, PLAYER_NAMES_SET, STARTING_ROUND_SET, ADD_PLAYER} from '../../actions/ui/entry'

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

export function entry(state: IEntryState = defaultState, action: EntryActions) {
  switch (action.type) {
  case OPTION_OPEN_TOGGLE:
    return {
      ...state,
      optionsOpened: !state.optionsOpened
    }
  case ROUNDS_SET: {
    const startingRound = state.startingRound > action.payload
      ? 1
      : state.startingRound
    return {
      ...state,
      rounds: action.payload,
      startingRound
    }
  }
  case CARDS_SET:
    return {
      ...state,
      cards: action.payload,
      rounds: Math.floor(action.payload / state.playerNames.length)
    }
  case STARTING_ROUND_SET:
    return {
      ...state,
      startingRound: action.payload
    }
  case ADD_PLAYER:
    return playerNameAction(state, [...state.playerNames, action.payload])
  case PLAYER_NAMES_SET:
    return playerNameAction(state, action.payload)
  default:
    return state
  }
}
