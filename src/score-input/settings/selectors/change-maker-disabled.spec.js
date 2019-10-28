import { genMap } from "../../../../test-fixtures/current-game-states";
import { namesChangedSelector } from "./names-changed";

/**
 * Build part of redux store tree for testing
 * @param {PlayerMap<string>} settingsName - `state.settings.names`
 * @param {PlayerMap<string>} names - `state.currentGame.names`
 * @returns {Object} Part of redux tree for consumption
 */
function buildTree(settingsName, names) {
  return {
    gameSettings: { names: settingsName },
    currentGame: { names }
  };
}

test("it should be false for same objects", () => {
  const names = genMap("John", "Joe", "Mary", "Katy");
  const tree = buildTree(names, names);
  const expected = false;
  const actual = namesChangedSelector(tree);
  expect(actual).toEqual(expected);
});

test("it should be true for distinct objects", () => {
  const settingsNames = genMap("John", "Joe", "Mary", "Parry");
  const names = genMap("John", "Joe", "Mary", "Katy");
  const tree = buildTree(settingsNames, names);
  const expected = true;
  const actual = namesChangedSelector(tree);
  expect(actual).toEqual(expected);
});

test("it should be true for equal object but different memory address", () => {
  const settingsNames = genMap("John", "Joe", "Mary", "Katy");
  const names = genMap("John", "Joe", "Mary", "Katy");
  const tree = buildTree(settingsNames, names);
  const expected = true;
  const actual = namesChangedSelector(tree);
  expect(actual).toEqual(expected);
});
