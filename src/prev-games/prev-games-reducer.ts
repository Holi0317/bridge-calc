import {PrevGameEntry} from './types'
import {PrevGamesActions} from './actions'
import {ActionTypes} from '../action-types'

export interface IPrevGamesState {
  prevGames: PrevGameEntry[]
}

const defaultState: IPrevGamesState = {
  prevGames: []
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

    case ActionTypes.RESET_GAMES:
      return defaultState

    default:
      return state
  }
}
