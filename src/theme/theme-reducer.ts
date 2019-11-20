import { ActionTypes } from "../action-types";
import { createReducer } from "typesafe-actions";
import { combineReducers } from "redux";

export interface ThemeState {
  /** Currently selected theme */
  theme: string;
  /** Dark */
  dark: boolean;
}

const activeThemeReducer = createReducer("Pink").handleType(
  ActionTypes.SET_THEME,
  (_, { payload }) => payload
);

const darkReducer = createReducer(false).handleType(
  ActionTypes.TOGGLE_DARK,
  state => !state
);

export const themeReducer = combineReducers({
  theme: activeThemeReducer,
  dark: darkReducer
});
