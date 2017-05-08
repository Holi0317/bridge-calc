import {deepFreeze} from '../helpers/deep-freeze'

export const defaultOptions = deepFreeze({
  cards: 52,
  rounds: 13,
  startingRound: 1,
  playerNames: ['John', 'Mary', 'Henry', 'Joe']
})
