import { ActionTypes } from "../action-types";
import { createReducer } from "typesafe-actions";

/**
 * Represent a player name in entry view.
 *
 * Each player should have an ID associated with her.
 * However this ID is not the same as the one in a game.
 */
export interface PlayerNameEntry {
  /**
   * Name of the player.
   */
  readonly value: string;
  /**
   * Unique ID of the player in entry view.
   */
  readonly id: string;
}

export interface EntryState {
  readonly rounds: number;
  readonly startingRound: number;
  readonly playerNames: ReadonlyArray<PlayerNameEntry>;
  readonly importOpened: boolean;
}

const defaultState: EntryState = {
  importOpened: false,
  // For the sake of pure function, ID here are hard-coded
  playerNames: [
    { value: "John", id: "1" },
    { value: "Mary", id: "2" },
    { value: "Henry", id: "3" },
    { value: "Joe", id: "4" }
  ],
  rounds: 13,
  startingRound: 1
};

/**
 * Action handler for PLAYER_NAMES_SET.
 *
 * Because it is fairly complex, this reducer is moved into a separate function.
 * (I don't want to look at this code with 8 space before each line ._.).
 *
 * See test/entry-reducer.spec.js for expected result on this.
 *
 * @param state - previous state of reducer
 * @param playerNames - original player names before updating
 */
function playerNameAction(
  state: EntryState,
  playerNames: ReadonlyArray<PlayerNameEntry>
): EntryState {
  const newPlayerNum = state.playerNames.length;
  const newRounds = Math.floor(52 / newPlayerNum);
  const playerNum = playerNames.length;
  const oldRounds = Math.floor(52 / playerNum);

  if (newPlayerNum > playerNum && newRounds <= state.rounds) {
    // Add player and currently selected rounds is too large
    return {
      ...state,
      rounds: newRounds
    };
  } else if (newPlayerNum < playerNum && state.rounds === oldRounds) {
    // Remove player and currently selected rounds is at maximum (i.e. default)
    return {
      ...state,
      rounds: newRounds
    };
  }

  return state;
}

export const entryReducer = createReducer(defaultState)
  .handleType(ActionTypes.RESET_ENTRY, () => defaultState)
  .handleType(ActionTypes.ADD_PLAYER, (state, action) =>
    playerNameAction(
      { ...state, playerNames: [...state.playerNames, action.payload] },
      state.playerNames
    )
  )
  .handleType(ActionTypes.SET_ENTRY_PROPS, (state, action) => {
    const res = playerNameAction(
      { ...state, ...action.payload },
      state.playerNames
    );
    if (res.startingRound > res.rounds) {
      return {
        ...res,
        startingRound: 1
      };
    }
    return res;
  });
