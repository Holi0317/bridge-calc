import {endedRoundsArraySelector} from './ended-rounds-array'
import {endedState, genMap, waitingBidState} from '../../../test-fixtures/current-game-states'

test('null state should produce empty array', () => {
  const expected = []
  const state = {
    currentGame: null
  }
  const actual = endedRoundsArraySelector(state)
  expect(actual).toEqual(expected)
})

test('1st round should produce empty array', () => {
  const expected = []
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = endedRoundsArraySelector(state)
  expect(actual).toEqual(expected)
})

test('ended state should produce [1..13]', () => {
  const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  const state = {
    currentGame: {
      ...endedState
    }
  }
  const actual = endedRoundsArraySelector(state)
  expect(actual).toEqual(expected)
})

test('2nd running round should produce [1]', () => {
  const expected = [1]
  const state = {
    currentGame: {
      ...waitingBidState,
      currentRound: 2,
      currentPlayerOrder: ['b', 'c', 'd', 'a'],
      scores: genMap([0], [0], [0], [0])
    }
  }
  const actual = endedRoundsArraySelector(state)
  expect(actual).toEqual(expected)
})
