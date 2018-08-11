import { setWinAction } from "./set-win";
import { ActionTypes } from "../../action-types";
import { genMap } from "../../../test-fixtures/current-game-states";

test("it should return set bid action", () => {
  const winMap = genMap(0, 0, 0, 0);
  const expected = {
    type: ActionTypes.SET_WIN,
    payload: winMap
  };
  const actual = setWinAction(winMap);
  expect(actual).toEqual(expected);
});
