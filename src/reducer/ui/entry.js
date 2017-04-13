import {UI_ENTRY_OPTION_OPEN_TOGGLE, UI_ENTRY_ROUNDS_SET, UI_ENTRY_CARDS_SET, UI_ENTRY_PLAYER_NAMES_SET, UI_ENTRY_STARTING_ROUND_SET, UI_ENTRY_ADD_PLAYER} from '../../action'

const defaultState = {
  cards: 52,
  rounds: 13,
  startingRound: 1,
  playerNames: ['John', 'Mary', 'Henry', 'Joe'],
  optionsOpened: false
}

/**
 * Action handler for UI_ENTRY_PLAYER_NAMES_SET.
 * Because it is fairly complex, this reducer is moved into a separate function.
 * (I don't want to look at this code with 8 space before each line ._.).
 * See test/entry-reducer.spec.js for expected result on this.
 * @param state {typeof defaultState} - previous state of reducer
 * @param playerNames {string[]} - New player names passed in as action payload
 */
function playerNameAction(state, playerNames) {
  const newPlayerNum = playerNames.length
  const newRounds = Math.floor(state.cards / newPlayerNum)
  const playerNum = state.playerNames.length
  const oldRounds = Math.floor(state.cards / playerNum)

  if (newPlayerNum === playerNum) {
    // Rename
    return {
      ...state,
      playerNames: playerNames
    }
  } else if (newPlayerNum > playerNum) {
    // Add player
    return {
      ...state,
      playerNames: playerNames,
      rounds: newRounds > state.rounds ? state.rounds : newRounds
    }
  } else {
    // Remove player
    return {
      ...state,
      playerNames: playerNames,
      rounds: state.rounds === oldRounds ? newRounds : state.rounds
    }
  }
}

export function entry(state = defaultState, action) {
  switch (action.type) {
  case UI_ENTRY_OPTION_OPEN_TOGGLE:
    return {
      ...state,
      optionsOpened: !state.optionsOpened
    }
  case UI_ENTRY_ROUNDS_SET:
    return {
      ...state,
      rounds: action.payload
    }
  case UI_ENTRY_CARDS_SET:
    return {
      ...state,
      cards: action.payload,
      rounds: Math.floor(action.payload / state.playerNames.length)
    }
  case UI_ENTRY_STARTING_ROUND_SET:
    return {
      ...state,
      startingRound: action.payload
    }
  case UI_ENTRY_ADD_PLAYER:
    return {
      ...state,
      playerNames: [...state.playerNames, action.payload]
    }
  case UI_ENTRY_PLAYER_NAMES_SET:
    return playerNameAction(state, action.payload)
  default:
    return state
  }
}
