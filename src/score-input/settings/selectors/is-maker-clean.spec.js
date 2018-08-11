import { isMakerCleanSelector } from "./is-maker-clean";

/**
 * Make part of redux tree for testing
 * @param {Boolean} makerDirty - `state.gameSettings.makerDirty`
 * @returns {Object} Part of redux tree for consumption
 */
function makeTree(makerDirty) {
  return {
    gameSettings: { makerDirty }
  };
}

test("it should return true for clean state", () => {
  const tree = makeTree(false);
  const expected = true;
  const actual = isMakerCleanSelector(tree);
  expect(actual).toEqual(expected);
});

test("it should return false for dirty state", () => {
  const tree = makeTree(true);
  const expected = false;
  const actual = isMakerCleanSelector(tree);
  expect(actual).toEqual(expected);
});
