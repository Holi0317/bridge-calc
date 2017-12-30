import {PrevGameEntry} from './types'
import {PrevGamesActions} from './actions'
import {RESET_GAMES} from './actions/reset-games'
import {ADD_GAME} from './actions/add-game'
import {DELETE_GAME} from './actions/delete-game'
import {SAVE_GAME} from './actions/save-game'

export interface IPrevGamesState {
  prevGames: PrevGameEntry[]
}

const defaultState: IPrevGamesState = {
  prevGames: []
}

export function prevGamesReducer(state = defaultState, action: PrevGamesActions) {
  switch (action.type) {
    case ADD_GAME:
      return {
        ...state,
        prevGames: [action.payload, ...state.prevGames]
      }

    case DELETE_GAME: {
      const prevGames = state.prevGames.slice()
      prevGames.splice(action.id, 1)
      return {
        ...state,
        prevGames
      }
    }

    case SAVE_GAME: {
      if (action.entry) {
        const newState = {
          ...state
        }
        newState.prevGames[0] = action.entry
        return newState
      }
      return state
    }

    case RESET_GAMES:
      return defaultState

    default:
      return state
  }
}
