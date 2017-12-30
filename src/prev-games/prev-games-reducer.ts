import {PrevGameEntry} from './types'
import {PrevGamesActions} from './actions'
import {RESET_GAMES} from './actions/reset-games'
import {ADD_GAME} from './actions/add-game'
import {DELETE_GAME} from './actions/delete-game'
import {ISaveGameAction, SAVE_GAME} from './actions/save-game'

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
      prevGames.splice(action.index, 1)
      return {
        ...state,
        prevGames
      }
    }

    case SAVE_GAME: {
      if (action.entry !== null) {
        // FIXME Remove type casting here
        const {entry}: ISaveGameAction = action
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

    case RESET_GAMES:
      return defaultState

    default:
      return state
  }
}
