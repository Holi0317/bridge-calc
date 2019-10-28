import { ToastSingletonActions } from "./actions";
import { ActionTypes } from "../action-types";

export interface ToastSingletonState {
  open: boolean;
  message: string;
  autoHideDuration: number;
}

const defaultState: ToastSingletonState = {
  open: false,
  message: "",
  autoHideDuration: 3000
};

export function toastSingletonReducer(
  state = defaultState,
  action: ToastSingletonActions
): ToastSingletonState {
  switch (action.type) {
    case ActionTypes.SHOW_TOAST:
      return {
        open: true,
        message: action.message,
        autoHideDuration: action.autoHideDuration
      };
    case ActionTypes.CLOSE_TOAST:
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
}
