import { nameInputListSourceSelector } from "./name-input-list-source";
import { genMap } from "../../../../test-fixtures/current-game-states";
import { makeSettingsTree } from "../../../../test-fixtures/settings-state";

test("Empty array should be selected when player names are empty", () => {
  const state = makeSettingsTree({});
  const expected = [];
  const actual = nameInputListSourceSelector(state);
  expect(actual).toEqual(expected);
});

test("Array of player names should be selected from settings state", () => {
  const state = makeSettingsTree({
    names: genMap("John", "Mary", "Henry", "Joe"),
    maker: "a"
  });
  const expected = [
    ["a", "John"],
    ["b", "Mary"],
    ["c", "Henry"],
    ["d", "Joe"]
  ];
  const actual = nameInputListSourceSelector(state);
  expect(actual).toEqual(expected);
});
