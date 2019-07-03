import {
  entryOptionsValidator as validator,
  isEntryOptionsValid
} from "./entry-validator";
import range from "lodash-es/range";
import { tData } from "../utils/translate";
import { makeEntryTree } from "../../test-fixtures/entry-options";

/**
 * Create part of redux store tree for validator to consume.
 *
 * @param {string[]} names Player names array
 * @returns {Object} Part of redux tree for consumption
 */
function makeTree(names) {
  const playerNames = names.map((name, i) => ({
    value: name,
    id: i
  }));

  return makeEntryTree({ playerNames });
}

const defaultNames = ["John", "Mary", "Henry", "Joe"];

test("validation should pass with default options", () => {
  const options = makeTree(defaultNames);
  const actual = validator(options);
  const expected = {};
  expect(actual).toEqual(expected);
});

test("validator should fail when there is no player", () => {
  const options = makeTree([]);
  const actual = validator(options);
  const expected = {
    misc: tData("At least 2 players is required for a game")
  };
  expect(actual).toEqual(expected);
});

test("validator should fail when there is only 1 player", () => {
  const options = makeTree(["DPGJW"]);
  const actual = validator(options);
  const expected = {
    misc: tData("At least 2 players is required for a game")
  };
  expect(actual).toEqual(expected);
});

test("validator should fail when there is too many players", () => {
  const options = makeTree(range(53).map(i => i + ""));
  const actual = validator(options);
  const expected = {
    misc: tData("Too many players. Upper limit is {{limit}} players.", {
      limit: 52
    })
  };
  expect(actual).toEqual(expected);
});

test("validator should fail when a player name is empty", () => {
  const options = makeTree(["John", "Mary", "", ""]);
  const actual = validator(options);
  const expected = {
    playerNames: [
      null,
      null,
      tData("Name cannot be empty"),
      tData("Name cannot be empty")
    ]
  };
  expect(actual).toEqual(expected);
});

test("validator should fail when there is repeated name", () => {
  const options = makeTree(["", "John", "John", "Mary"]);
  const actual = validator(options);
  const expected = {
    playerNames: [
      tData("Name cannot be empty"),
      tData("Name cannot be repeated"),
      tData("Name cannot be repeated"),
      null
    ]
  };
  expect(actual).toEqual(expected);
});

test("is valid should be true when default options is passed in", () => {
  const options = makeTree(defaultNames);
  const actual = isEntryOptionsValid(options);
  const expected = true;
  expect(actual).toEqual(expected);
});

test("is valid should be false when erroneous options is passed in", () => {
  const options = makeTree(["", "John", "John", "Mary"]);
  const actual = isEntryOptionsValid(options);
  const expected = false;
  expect(actual).toEqual(expected);
});
