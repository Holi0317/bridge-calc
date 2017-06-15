import test from 'ava'
import {playerRankSelector} from '../../src/selectors/player-rank'
import {genMap, waitingBidState} from '../fixtures/current-game-states'

test('null state should produce empty object', t => {
  const expected = {}
  const state = {
    currentGame: null
  }
  const actual = playerRankSelector(state)
  t.deepEqual(actual, expected, 'Empty object should be produced')
})

test('1st round should produce all 1st place', t => {
  const expected = genMap('1st', '1st', '1st', '1st')
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = playerRankSelector(state)
  t.deepEqual(actual, expected, 'All players should be ranked first')
})

test('3rd round should rank properly', t => {
  const expected = genMap('2nd', '4th', '1st', '2nd')
  const state = {
    currentGame: {
      ...waitingBidState,
      currentRound: 3,
      currentPlayerOrder: ['c', 'd', 'a', 'b'],
      scores: genMap([10, -1], [-1, -1], [10, 10], [-1, 10])
    }
  }
  const actual = playerRankSelector(state)
  t.deepEqual(actual, expected, 'All players should be ranked first')
})
