import { ActionTypes } from "../../action-types";
import { replaceCurrentGameAction } from "./replace-current-game";

test("it should produce replace current game action", () => {
  const expected = {
    type: ActionTypes.REPLACE_CURRENT_GAME,
    payload: null
  };
  const actual = replaceCurrentGameAction(null);
  expect(actual).toEqual(expected);
});
