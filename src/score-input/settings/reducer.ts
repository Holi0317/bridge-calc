import {GameStage} from '../game-stage'
import {GameSettingsActions} from './actions'
import {IPlayerMap} from '../../types'
import {ActionTypes} from '../../action-types'

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
}

const defaultState: ISettingsState = {
  maker: null,
  makerDirty: false,
  names: {}
}

export function settingsReducer(state: ISettingsState = defaultState, action: GameSettingsActions): ISettingsState {
  switch (action.type) {
  case ActionTypes.INIT_SETTINGS: {
    const gameState = action.state
    if (gameState == null || gameState.stage === GameStage.ended) {
      return defaultState
    }
    return {
      maker: gameState.currentPlayerOrder[0],
      makerDirty: false,
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
  default:
    return state
  }
}
