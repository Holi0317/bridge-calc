import {IPrevGameEntry} from './types'
import {PrevGamesActions} from './actions'

export interface IPrevGamesState {
  prevGames: IPrevGameEntry[]
}

const defaultState: IPrevGamesState = {
  prevGames: []
}

export function prevGamesReducer(state = defaultState, action: PrevGamesActions) {
  switch (action.type) {
    // TODO Implement action handlers
    default:
      return state
  }
}
