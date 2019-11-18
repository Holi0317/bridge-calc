import { GameStage } from "../game-stage";
import { skip } from "./skip";
import { changePlayersHandler } from "./change-players-handler";
import {
  toWaitingBidState,
  toWaitingWinState,
  toEndedState
} from "./converter";
import { bidWinGenerator } from "./bid-win-generator";
import { GameState, EndedState, WaitingBidState } from "./types";
import { ActionTypes } from "../../action-types";
import { createReducer } from "typesafe-actions";
import { fillObj, toFront } from "../../utils";
import { computeScores } from "./compute-scores";
import { isWaitingWinState, isWaitingBidState } from "./validator";

const defaultState: GameState = null;

/**
 * Check if given game state is readonly
 * @param state Game state to be checked
 * @returns State is editable and not null
 */
function isRO(state: GameState): state is null | EndedState {
  return state == null || state.stage === GameStage.ended;
}

export const currentGameReducer = createReducer(defaultState as GameState)
  .handleType(ActionTypes.START, (_, { payload }) => {
    const playerIDs = Object.keys(payload.playerNames);

    const firstState: WaitingBidState = {
      stage: GameStage.waitingBid,
      id: payload.id,
      rounds: payload.rounds,
      startTime: payload.startTime,
      names: payload.playerNames,
      scores: fillObj({}, playerIDs, []),
      bid: bidWinGenerator(playerIDs),
      currentPlayerOrder: playerIDs,
      currentRound: 1
    };
    return skip(firstState, payload.startingRound - 1, payload.startTime);
  })
  .handleType(ActionTypes.REPLACE_CURRENT_GAME, (_, { payload }) => payload)
  .handleType(ActionTypes.SKIP, (state, { payload }) =>
    isRO(state) ? state : skip(state, payload.times, payload.date)
  )
  .handleType(ActionTypes.SET_BID, (state, { payload }) =>
    isRO(state) || isWaitingWinState(state) ? state : { ...state, bid: payload }
  )
  .handleType(ActionTypes.SET_WIN, (state, { payload }) =>
    isRO(state) || isWaitingBidState(state)
      ? state
      : { ...toWaitingWinState(state), win: payload }
  )
  .handleType(ActionTypes.BID, (state, { payload }) =>
    isRO(state)
      ? state
      : {
          ...state,
          stage: GameStage.waitingWin,
          bid: payload || state.bid,
          win: bidWinGenerator(Object.keys(state.names))
        }
  )
  .handleType(ActionTypes.WIN, (state, { payload }) => {
    if (isRO(state)) {
      return state;
    }
    if (state.stage === GameStage.waitingBid) {
      return state;
    }
    const win = payload.win || state.win;
    if (state.rounds === state.currentRound) {
      // Last round
      return {
        ...toEndedState(state, payload.time),
        scores: computeScores(state.bid, win, state.scores)
      };
    }

    // Proceed to next round
    return {
      ...toWaitingBidState(state),
      bid: bidWinGenerator(Object.keys(state.names)),
      currentRound: state.currentRound + 1,
      currentPlayerOrder: toFront(state.currentPlayerOrder, 1),
      scores: computeScores(state.bid, win, state.scores)
    };
  })
  .handleType(ActionTypes.UNDO, state => {
    if (isRO(state)) {
      return state;
    }
    if (state.stage === GameStage.waitingBid) {
      return state;
    }

    return toWaitingBidState(state);
  })
  .handleType(ActionTypes.CHANGE_PLAYERS, (state, { payload }) =>
    isRO(state)
      ? state
      : changePlayersHandler({
          state,
          newNames: payload.newNames,
          rounds: payload.rounds,
          maker: payload.maker,
          time: payload.time
        })
  );
