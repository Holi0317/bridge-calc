import { EntryActions } from "./actions";
import { ActionTypes } from "../action-types";

/**
 * Represent a player name in entry view.
 *
 * Each player should have an ID associated with her.
 * However this ID is not the same as the one in a game.
 */
export interface IPlayerNameEntry {
  /**
   * Name of the player.
   */
  value: string;
  /**
   * Unique ID of the player in entry view.
   */
  id: string;
}

export interface IEntryState {
  rounds: number;
  startingRound: number;
  playerNames: IPlayerNameEntry[];
  importOpened: boolean;
}

const defaultState: IEntryState = {
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
 * ATTENTION: This function will mutate given state object
 *
 * @param state - previous state of reducer
 * @param playerNames - original player names before updating
 */
function playerNameAction(state: IEntryState, playerNames: IPlayerNameEntry[]) {
  const newPlayerNum = state.playerNames.length;
  const newRounds = Math.floor(52 / newPlayerNum);
  const playerNum = playerNames.length;
  const oldRounds = Math.floor(52 / playerNum);

  if (newPlayerNum > playerNum && newRounds <= state.rounds) {
    // Add player and currently selected rounds is too large
    state.rounds = newRounds;
  } else if (newPlayerNum < playerNum && state.rounds === oldRounds) {
    // Remove player and currently selected rounds is at maximum (i.e. default)
    state.rounds = newRounds;
  }
}

export function entryReducer(
  state: IEntryState = defaultState,
  action: EntryActions
) {
  switch (action.type) {
    case ActionTypes.SET_ENTRY_PROPS: {
      const { type, ...props } = action;
      const res: IEntryState = {
        ...state,
        ...props
      };
      if (res.startingRound > res.rounds) {
        res.startingRound = 1;
      }
      playerNameAction(res, state.playerNames);
      return res;
    }
    case ActionTypes.ADD_PLAYER: {
      const res: IEntryState = {
        ...state,
        playerNames: [...state.playerNames, action.payload]
      };
      playerNameAction(res, state.playerNames);
      return res;
    }
    case ActionTypes.RESET_ENTRY:
      return defaultState;
    default:
      return state;
  }
}
