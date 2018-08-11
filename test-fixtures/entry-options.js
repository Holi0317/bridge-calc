import { deepFreeze } from "./deep-freeze";

export const defaultState = deepFreeze({
  rounds: 13,
  startingRound: 1,
  playerNames: ["John", "Mary", "Henry", "Joe"],
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
