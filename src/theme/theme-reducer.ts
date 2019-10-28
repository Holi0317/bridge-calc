import { ThemeActions } from "./actions";
import { ActionTypes } from "../action-types";

export interface ThemeState {
  /** Currently selected theme */
  theme: string;
  /** Dark */
  dark: boolean;
}

const defaultState: ThemeState = {
  theme: "Pink",
  dark: false
};

export function themeReducer(
  state = defaultState,
  action: ThemeActions
): ThemeState {
  switch (action.type) {
    case ActionTypes.SET_THEME:
      return {
        ...state,
        theme: action.theme
      };
    case ActionTypes.TOGGLE_DARK:
      return {
        ...state,
        dark: !state.dark
      };
    default:
      return state;
  }
}
