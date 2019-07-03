import { deepFreeze } from "./deep-freeze";

export const defaultState = deepFreeze({
  rounds: 13,
  startingRound: 1,
  playerNames: [
    { value: "John", id: "1" },
    { value: "Mary", id: "2" },
    { value: "Henry", id: "3" },
    { value: "Joe", id: "4" }
  ],
  importOpened: false
});

/**
 * Create mock redux state tree for test related to entry module.
 *
 * @param {object} rest Object to override default state in return tree
 * @returns {object} partial redux tree for testing
 */
export function makeEntryTree(rest) {
  return {
    entry: {
      ...defaultState,
      ...rest
    }
  };
}
