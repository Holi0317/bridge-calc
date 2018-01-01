import {deepFreeze} from './deep-freeze'

export const defaultState = deepFreeze({
  rounds: 13,
  startingRound: 1,
  playerNames: ['John', 'Mary', 'Henry', 'Joe'],
  optionsOpened: false,
  importOpened: false
})

/**
 * Create mock redux state tree for test related to entry module.
 */
export function makeEntryTree(rest) {
  return {
    entry: {
      ...defaultState,
      ...rest
    }
  }
}
