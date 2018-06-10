import {GameStage} from '../game-stage'
import {GameSettingsActions} from './actions'
import {IPlayerMap} from '../../types'
import {ActionTypes} from '../../action-types'
import {PANEL} from './panel'

export interface ISettingsState {
  /**
   * Player ID of currently selected maker.
   * If null, no maker is selected or the game is not running.
   */
  maker: string | null,
  /**
   * If maker has changed by user or not.
   * By default, this value is false.
   */
  makerDirty: boolean,
  /**
   * New player map.
   */
  names: IPlayerMap<string>
  /**
   * State which panel is expanded now.
   * If null, no panel is expanded.
   */
  expandedPanel: PANEL | null
}

const defaultState: ISettingsState = {
  maker: null,
  makerDirty: false,
  names: {},
  expandedPanel: null
}

export function settingsReducer(state: ISettingsState = defaultState, action: GameSettingsActions): ISettingsState {
  switch (action.type) {
  case ActionTypes.INIT_SETTINGS: {
    const gameState = action.state
    if (gameState == null || gameState.stage === GameStage.ended) {
      return defaultState
    }
    return {
      ...defaultState,
      maker: gameState.currentPlayerOrder[0],
      names: gameState.names
    }
  }
  case ActionTypes.SET_MAKER:
    return {
      ...state,
      makerDirty: true,
      maker: action.maker
    }
  case ActionTypes.SET_NAMES:
    return {
      ...state,
      names: action.newNames
    }
  case ActionTypes.ADD_NAME:
    return {
      ...state,
      names: {
        ...state.names,
        [action.ID]: action.name
      }
    }
  case ActionTypes.TOGGLE_SETTING_PANEL: {
    if (action.panel === state.expandedPanel) {
      return {
        ...state,
        expandedPanel: null
      }
    }
    return {
      ...state,
      expandedPanel: action.panel
    }
  }

  default:
    return state
  }
}
