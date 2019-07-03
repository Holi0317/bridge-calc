import { addPlayerAction, addRandomPlayerAction } from "./add-player";
import { ActionTypes } from "../../action-types";

test("it should return add player action", () => {
  const actual = addPlayerAction("John");
  expect(actual.type).toEqual(ActionTypes.ADD_PLAYER);
  expect(typeof actual.payload.value).toEqual("string");
  expect(typeof actual.payload.id).toEqual("string");
});

test("addRandomPlayer should return add player action with random player name", () => {
  const actual = addRandomPlayerAction();
  expect(actual.type).toEqual(ActionTypes.ADD_PLAYER);
  expect(typeof actual.payload.value).toEqual("string");
});
