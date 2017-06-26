import test from 'ava'
import {endedRoundsArraySelector} from '../../../src/selectors/current-game/ended-rounds-array'
import {endedState, genMap, waitingBidState} from '../../fixtures/current-game-states'

test('null state should produce empty array', t => {
  const expected = []
  const state = {
    currentGame: null
  }
  const actual = endedRoundsArraySelector(state)
  t.deepEqual(actual, expected, 'empty array should be selected')
})

test('1st round should produce empty array', t => {
  const expected = []
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = endedRoundsArraySelector(state)
  t.deepEqual(actual, expected, 'empty array should be selected')
})

test('ended state should produce [1..13]', t => {
  const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  const state = {
    currentGame: {
      ...endedState
    }
  }
  const actual = endedRoundsArraySelector(state)
  t.deepEqual(actual, expected, '[1] should be selected')
})

test('2nd running round should produce [1]', t => {
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
  t.deepEqual(actual, expected, '[1] should be selected')
})
