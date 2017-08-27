import {GameStage} from '../../game-stage'
import {SettingsActions, ADD_NAME, SET_BY_GAME_STATE, SET_MAKER, SET_NAMES} from '../../actions/ui/settings'
import {IPlayerMap} from '../../types'

export interface ISettingsState {
  /**
   * Player ID of currently selected maker.
   * If null, no maker is selected or the game is not running.
   */
  maker: string | null,
  /**
   * New player map.
   */
  names: IPlayerMap<string>
}

const defaultState: ISettingsState = {
  maker: null,
  names: {}
}

export function settings(state: ISettingsState = defaultState, action: SettingsActions): ISettingsState {
  switch (action.type) {
  case SET_BY_GAME_STATE: {
    const gameState = action.state
    if (gameState == null || gameState.stage === GameStage.ended) {
      return defaultState
    }
    return {
      maker: gameState.currentPlayerOrder[0],
      names: gameState.names
    }
  }
  case SET_MAKER:
    return {
      ...state,
      maker: action.maker
    }
  case SET_NAMES:
    return {
      ...state,
      names: action.newNames
    }
  case ADD_NAME:
    return {
      ...state,
      names: {
        ...state.names,
        [action.ID]: action.name
      }
    }
  default:
    return state
  }
}
