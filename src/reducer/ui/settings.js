// @flow
import {GameStage} from '../../game-stage'
import {ADD_NAME, SET_BY_GAME_STATE, SET_MAKER, SET_NAMES} from '../../actions/ui/settings'

import type {SettingsActions} from '../../actions/ui/settings'
import type {IPlayerMap} from '../../types'

export type SettingsState = {
  /**
   * Player ID of currently selected maker.
   * If null, no maker is selected or the game is not running.
   */
  maker: ?string,
  /**
   * New player map.
   */
  names: IPlayerMap<string>
}

const defaultState: SettingsState = {
  maker: null,
  names: {}
}

export function settings(state: SettingsState = defaultState, action: SettingsActions): SettingsState {
  switch (action.type) {
  case SET_BY_GAME_STATE: {
    const gameState = action.state
    if (gameState == null || gameState.stage === GameStage.ended) {
      return defaultState
    }
    return {
      names: gameState.names,
      maker: gameState.currentPlayerOrder[0]
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
