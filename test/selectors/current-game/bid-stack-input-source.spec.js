import test from 'ava'
import {endedState, genMap, waitingBidState} from '../../fixtures/current-game-states'
import {bidStackInputSourceSelector} from '../../../src/selectors/current-game/bid-stack-input-source'

test('Source for null state should have no option', t => {
  const state = {
    currentGame: null
  }
  const expected = {}
  const actual = bidStackInputSourceSelector(state)
  t.deepEqual(actual, expected, 'No option should be generated')
})

test('Source for ended state should have 1 disabled option', t => {
  const state = {
    currentGame: {
      ...endedState
    }
  }
  const source = [
    {value: 0, label: '0', disabled: true}
  ]
  const expected = genMap(source, source, source, source)
  const actual = bidStackInputSourceSelector(state)
  t.deepEqual(actual, expected, '1 option should be generated')
})

test('Sources for 1st round', t => {
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const source = [
    {value: 0, label: '0'},
    {value: 1, label: '1'}
  ]
  const lastBid = [
    {value: 0, label: '0'},
    {value: 1, label: '1', disabled: true}
  ]
  const expected = genMap(source, source, source, lastBid)
  const actual = bidStackInputSourceSelector(state)
  t.deepEqual(actual, expected, '2 options should be generated')
})

test('Sources for 2nd round', t => {
  const state = {
    currentGame: {
      ...waitingBidState,
      scores: genMap([0], [0], [0], [0]),
      currentPlayerOrder: ['b', 'c', 'd', 'a'],
      currentRound: 2
    }
  }
  const source = [
    {value: 0, label: '0'},
    {value: 1, label: '1'},
    {value: 2, label: '2'}
  ]
  const lastBid = [
    {value: 0, label: '0'},
    {value: 1, label: '1'},
    {value: 2, label: '2', disabled: true}
  ]
  const expected = genMap(lastBid, source, source, source)
  const actual = bidStackInputSourceSelector(state)
  t.deepEqual(actual, expected, '3 options should be generated')
})

test('Invalid bid should be disabled for last player', t => {
  const state = {
    currentGame: {
      ...waitingBidState,
      bid: genMap(0, 1, 0, 0)
    }
  }
  const source = [
    {value: 0, label: '0'},
    {value: 1, label: '1'}
  ]
  const lastBid = [
    {value: 0, label: '0', disabled: true},
    {value: 1, label: '1'}
  ]
  const expected = genMap(source, source, source, lastBid)
  const actual = bidStackInputSourceSelector(state)
  t.deepEqual(actual, expected, '0 option in d should be disabled in bid')
})

test('Invalid bid should be disabled for last player -- Second round', t => {
  const state = {
    currentGame: {
      ...waitingBidState,
      scores: genMap([0], [0], [0], [0]),
      currentPlayerOrder: ['b', 'c', 'd', 'a'],
      currentRound: 2,
      bid: genMap(0, 0, 1, 0)
    }
  }
  const source = [
    {value: 0, label: '0'},
    {value: 1, label: '1'},
    {value: 2, label: '2'}
  ]
  const lastBid = [
    {value: 0, label: '0'},
    {value: 1, label: '1', disabled: true},
    {value: 2, label: '2'}
  ]
  const expected = genMap(lastBid, source, source, source)
  const actual = bidStackInputSourceSelector(state)
  t.deepEqual(actual, expected, '1 option in a should be disabled')
})
