import { createReducer } from "typesafe-actions";
import { ActionTypes } from "../action-types";

export interface ToastSingletonState {
  readonly open: boolean;
  readonly message: string;
  readonly autoHideDuration: number;
}

const defaultState: ToastSingletonState = {
  open: false,
  message: "",
  autoHideDuration: 3000
};

export const toastSingletonReducer = createReducer(defaultState)
  .handleType(ActionTypes.SHOW_TOAST, (_, { payload }) => ({
    open: true,
    ...payload
  }))
  .handleType(ActionTypes.CLOSE_TOAST, state => ({
    ...state,
    open: false
  }));
