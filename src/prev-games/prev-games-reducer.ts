import {PrevGameEntry} from './types'
import {PrevGamesActions} from './actions'
import {ActionTypes} from '../action-types'

export interface IPrevGamesState {
  /**
   * Array of game entries played in the past or currently playing
   */
  prevGames: PrevGameEntry[],
  /**
   * The index of game entry modal is currently showing.
   * Or null, which means no entry should be show now.
   */
  modalEntry: number | null
}

const defaultState: IPrevGamesState = {
  prevGames: [],
  modalEntry: null
}

export function prevGamesReducer(state = defaultState, action: PrevGamesActions) {
  switch (action.type) {
    case ActionTypes.ADD_GAME:
      return {
        ...state,
        prevGames: [...state.prevGames, action.payload]
      }

    case ActionTypes.DELETE_GAME: {
      const prevGames = state.prevGames.slice()
      prevGames.splice(action.index, 1)
      return {
        ...state,
        prevGames
      }
    }

    case ActionTypes.SAVE_GAME: {
      if (action.entry !== null) {
        const {entry} = action
        const index = state.prevGames.findIndex(game => game.id === entry.id)
        if (index === -1) {
          return {
            ...state,
            prevGames: [...state.prevGames, entry]
          }
        }

        const newState = {
          ...state
        }
        newState.prevGames[index] = action.entry
        return newState
      }

      return state
    }

  case ActionTypes.SET_GAME_MODAL:
    return {
      ...state,
      modalEntry: action.index
    }

    case ActionTypes.RESET_GAMES:
      return defaultState

    default:
      return state
  }
}
