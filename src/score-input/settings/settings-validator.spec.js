import { range } from "lodash-es";
import { genMap } from "../../../test-fixtures/current-game-states";
import { isSettingsValid, settingsValidator } from "./settings-validator";
import { tData } from "../../utils";

/**
 * Create segment of redux tree for validator to consume
 * @param {PlayerMap<string>} names Player names inside a PlayerMap
 * @param {number|null} currentRound `state.currentGame.currentRound`, pass in null to stimulate null game/ended game
 * @returns {Object} Part of redux tree to consume
 */
function makeTree(names, currentRound = 1) {
  return {
    currentGame: { currentRound },
    gameSettings: { names }
  };
}

describe("settingsValidator", () => {
  test("it should pass for default names", () => {
    const names = genMap("John", "Mary", "Henry", "Joe");
    const tree = makeTree(names);
    const expected = {
      names: {},
      misc: null
    };
    const actual = settingsValidator(tree);
    expect(actual).toEqual(expected);
  });

  test("it should fail if duplicate names exist", () => {
    const names = genMap("John", "Mary", "John", "Joe");
    const tree = makeTree(names);
    const expected = {
      names: {
        a: tData("Name cannot be repeated"),
        c: tData("Name cannot be repeated")
      },
      misc: null
    };
    const actual = settingsValidator(tree);
    expect(actual).toEqual(expected);
  });

  test("it should pass (as fallback measure) if game is not started", () => {
    const names = genMap("John", "Mary", "Henry", "Joe");
    const tree = makeTree(names, null);
    const expected = {
      names: {},
      misc: null
    };
    const actual = settingsValidator(tree);
    expect(actual).toEqual(expected);
  });

  test("it should fail if one of the name is empty", () => {
    const names = genMap("", "Mary", "Henry", "Joe");
    const tree = makeTree(names);
    const expected = {
      names: {
        a: tData("Name cannot be empty")
      },
      misc: null
    };
    const actual = settingsValidator(tree);
    expect(actual).toEqual(expected);
  });

  test("it should fail if there is no player", () => {
    const names = {};
    const tree = makeTree(names);
    const expected = {
      names: {},
      misc: tData("At least 2 players is required for a game")
    };
    const actual = settingsValidator(tree);
    expect(actual).toEqual(expected);
  });

  test("it should fail if there is only 1 player", () => {
    const names = { a: "John" };
    const tree = makeTree(names);
    const expected = {
      names: {},
      misc: tData("At least 2 players is required for a game")
    };
    const actual = settingsValidator(tree);
    expect(actual).toEqual(expected);
  });

  test("it should fail if there are too many players", () => {
    const names = range(53)
      .map(i => i + "")
      .reduce((acc, val) => ({ ...acc, [val]: val }), {});
    const tree = makeTree(names);
    const expected = {
      names: {},
      misc: tData("Too many players. Upper limit is {{limit}} players.", {
        limit: 52
      })
    };
    const actual = settingsValidator(tree);
    expect(actual).toEqual(expected);
  });

  test("it should fail if current round has passed through maximum round", () => {
    const names = range(10)
      .map(i => i + "")
      .reduce((acc, val) => ({ ...acc, [val]: val }), {});
    const tree = makeTree(names, 7);
    const expected = {
      names: {},
      misc: tData("Impossible to continue the game due to too many players")
    };
    const actual = settingsValidator(tree);
    expect(actual).toEqual(expected);
  });
});

describe("isSettingsValid", () => {
  test("is valid should pass for default names", () => {
    const names = genMap("John", "Mary", "Henry", "Joe");
    const tree = makeTree(names);
    const expected = true;
    const actual = isSettingsValid(tree);
    expect(actual).toEqual(expected);
  });

  test("is valid should return false for erroneous data", () => {
    const names = genMap("", "Mary", "Henry", "Joe");
    const tree = makeTree(names);
    const expected = false;
    const actual = isSettingsValid(tree);
    expect(actual).toEqual(expected);
  });
});
