import {deepFreeze} from './deep-freeze'

export const defaultOptions = deepFreeze({
  cards: 52,
  rounds: 13,
  startingRound: 1,
  playerNames: ['John', 'Mary', 'Henry', 'Joe']
})

/**
 * Create mock redux state tree for test related to entry module.
 */
export function makeEntryTree(rest) {
  return {
    entry: {
      ...defaultOptions,
      ...rest
    }
  }
}
