import { ActionTypes } from "../../../action-types";
import { genMap } from "../../../../test-fixtures/current-game-states";
import { setNamesAction, setNamesFromEntries } from "./set-names";

test("it should return set names action", () => {
  const newNames = genMap("John", "Mark", "Mary");
  const expected = {
    type: ActionTypes.SET_NAMES,
    newNames
  };
  const actual = setNamesAction(newNames);
  expect(actual).toEqual(expected);
});

test("from entries form should set names", () => {
  const input = [{ value: "John", id: "a" }, { value: "Joe", id: "b" }];
  const expected = {
    type: ActionTypes.SET_NAMES,
    newNames: {
      a: "John",
      b: "Joe"
    }
  };
  const actual = setNamesFromEntries(input);
  expect(actual).toEqual(expected);
});
