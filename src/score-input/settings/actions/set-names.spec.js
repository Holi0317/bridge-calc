import { ActionTypes } from "../../../action-types";
import { genMap } from "../../../../test-fixtures/current-game-states";
import { setNamesAction, setNamesFromArrayAction } from "./set-names";

test("it should return set names action", () => {
  const newNames = genMap("John", "Mark", "Mary");
  const expected = {
    type: ActionTypes.SET_NAMES,
    newNames
  };
  const actual = setNamesAction(newNames);
  expect(actual).toEqual(expected);
});

test("from array form should set names", () => {
  const input = [["a", "John"], ["b", "Joe"]];
  const expected = {
    type: ActionTypes.SET_NAMES,
    newNames: {
      a: "John",
      b: "Joe"
    }
  };
  const actual = setNamesFromArrayAction(input);
  expect(actual).toEqual(expected);
});
