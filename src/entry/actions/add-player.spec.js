import { addPlayerAction, addRandomPlayerAction } from "./add-player";
import { ActionTypes } from "../../action-types";

test("it should return add player action", () => {
  const expected = {
    type: ActionTypes.ADD_PLAYER,
    payload: "John"
  };
  const actual = addPlayerAction("John");
  expect(actual).toEqual(expected);
});

test("addRandomPlayer should return add player action with random player name", () => {
  const actual = addRandomPlayerAction();
  expect(actual.type).toEqual(ActionTypes.ADD_PLAYER);
  expect(typeof actual.payload).toEqual("string");
});
