import {t as trans} from '../../helpers/translate'
import {endedState, waitingBidState} from '../../fixtures/current-game-states'
import {gameTitleSelector} from '../../../src/selectors/current-game/game-title'

test('empty string should be computed for null current game state', () => {
  const expected = ''
  const state = {
    currentGame: null
  }
  const actual = gameTitleSelector(state, trans)
  expect(actual).toBe(expected)
})

test('Ended game should have proper title', () => {
  const expected = 'Game over'
  const state = {
    currentGame: {
      ...endedState
    }
  }
  const actual = gameTitleSelector(state, trans)
  expect(actual).toBe(expected)
})

test('Running state should have title consist of current round and max round', () => {
  const expected = 'Round 2 of 5'
  const state = {
    currentGame: {
      ...waitingBidState,
      currentRound: 2,
      rounds: 5
    }
  }
  const actual = gameTitleSelector(state, trans)
  expect(actual).toBe(expected)
})
