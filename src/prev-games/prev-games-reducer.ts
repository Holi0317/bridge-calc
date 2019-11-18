import { createReducer } from "typesafe-actions";
import { combineReducers } from "redux";
import { PrevGameEntry } from "./types";
import { ActionTypes } from "../action-types";

const modalReducer = createReducer(null as number | null)
  .handleType(ActionTypes.SET_GAME_MODAL, (_, { payload }) => payload)
  .handleType(ActionTypes.RESET_GAMES, () => null);

const prevArrayReducer = createReducer([] as PrevGameEntry[])
  .handleType(ActionTypes.ADD_GAME, (state, { payload }) => [...state, payload])
  .handleType(ActionTypes.DELETE_GAME, (state, { payload }) =>
    state.filter((_, index) => index !== payload)
  )
  .handleType(ActionTypes.SAVE_GAME, (state, { payload }) => {
    if (payload != null) {
      const index = state.findIndex(game => game.id === payload.id);
      if (index === -1) {
        return [...state, payload];
      }

      const newState = [...state];
      newState[index] = payload;
      return newState;
    }

    return state;
  })
  .handleType(ActionTypes.RESET_GAMES, () => []);

export const prevGamesReducer = combineReducers({
  prevGames: prevArrayReducer,
  modalEntry: modalReducer
});
