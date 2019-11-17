import { changePlayersAction } from "./change-players";
import { ActionTypes } from "../../action-types";
import { genMap } from "../../../test-fixtures/current-game-states";
import * as lolex from "lolex";

test("it should return change players action", () => {
  const clock = lolex.install();
  const newNames = genMap("John", "Mary", "Henry", "Joe");
  const expected = {
    type: ActionTypes.CHANGE_PLAYERS,
    payload: {
      newNames,
      maker: "a",
      rounds: 13,
      time: 0
    }
  };
  const actual = changePlayersAction(newNames, "a", 13);
  expect(actual).toEqual(expected);
  clock.uninstall();
});
