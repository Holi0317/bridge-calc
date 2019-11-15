import { GameStage } from "../game-stage";
import { PlayerMap } from "../../types";
import { ActionTypes } from "../../action-types";
import { PANEL } from "./panel";
import { createReducer } from "typesafe-actions";

export interface SettingsState {
  /**
   * Player ID of currently selected maker.
   * If null, no maker is selected or the game is not running.
   */
  readonly maker: string | null;
  /**
   * If maker has changed by user or not.
   * By default, this value is false.
   */
  readonly makerDirty: boolean;
  /**
   * New player map.
   */
  readonly names: PlayerMap<string>;
  /**
   * State which panel is expanded now.
   * If null, no panel is expanded.
   */
  readonly expandedPanel: PANEL | null;
}

const defaultState: SettingsState = {
  maker: null,
  makerDirty: false,
  names: {},
  expandedPanel: null
};

export const settingsReducer = createReducer(defaultState)
  .handleType(ActionTypes.INIT_SETTINGS, (_, { payload }) =>
    payload == null || payload.stage === GameStage.ended
      ? defaultState
      : {
          ...defaultState,
          maker: payload.currentPlayerOrder[0],
          names: payload.names
        }
  )
  .handleType(ActionTypes.SET_MAKER, (state, { payload }) => ({
    ...state,
    makerDirty: true,
    maker: payload
  }))
  .handleType(ActionTypes.SET_NAMES, (state, { payload }) => ({
    ...state,
    names: payload
  }))
  .handleType(ActionTypes.ADD_NAME, (state, { payload }) => ({
    ...state,
    names: {
      ...state.names,
      [payload.id]: payload.name
    }
  }))
  .handleType(ActionTypes.TOGGLE_SETTING_PANEL, (state, { payload }) => ({
    ...state,
    expandedPanel: payload === state.expandedPanel ? null : payload
  }));
