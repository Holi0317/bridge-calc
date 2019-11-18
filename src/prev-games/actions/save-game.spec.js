import { saveGameAction } from "./save-game";
import { ActionTypes } from "../../action-types";
import { endedState } from "../../../test-fixtures/current-game-states";

test("no entry should be populated for null game state", () => {
  const expected = {
    type: ActionTypes.SAVE_GAME,
    payload: null
  };
  const actual = saveGameAction(null);
  expect(actual).toEqual(expected);
});

test("it should fill in entry property with PrevGame", () => {
  const expected = {
    type: ActionTypes.SAVE_GAME,
    payload: endedState
  };
  const actual = saveGameAction(endedState);
  expect(actual).toEqual(expected);
});
