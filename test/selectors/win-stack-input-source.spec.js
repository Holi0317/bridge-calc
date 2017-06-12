import test from 'ava'
import {endedState, genMap, waitingBidState, waitingWinState} from '../fixtures/current-game-states'
import {winStackInputSourceSelector} from '../../src/selectors/win-stack-input-source'

test('Source for null state should have no option', t => {
  const state = {
    currentGame: null
  }
  const expected = {}
  const actual = winStackInputSourceSelector(state)
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
  const actual = winStackInputSourceSelector(state)
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
  const expected = genMap(source, source, source, source)
  const actual = winStackInputSourceSelector(state)
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
  const expected = genMap(source, source, source, source)
  const actual = winStackInputSourceSelector(state)
  t.deepEqual(actual, expected, '3 options should be generated')
})

test('Win should be disabled if selections that will exceed win', t => {
  const state = {
    currentGame: {
      ...waitingWinState,
      bid: {a: 0, b: 1, c: 0, d: 1},
      win: {a: 1}
    }
  }
  const source = [
    {value: 0, label: '0'},
    {value: 1, label: '1'}
  ]
  const restWin = [
    {value: 0, label: '0'},
    {value: 1, label: '1', disabled: true}
  ]
  const expected = genMap(source, restWin, restWin, restWin)
  const actual = winStackInputSourceSelector(state)
  t.deepEqual(actual, expected, 'Exceed win should be disabled')
})

test('Win should be disabled if the selection will exceed than win -- Second round', t => {
  const state = {
    currentGame: {
      ...waitingWinState,
      scores: genMap([0], [0], [0], [0]),
      currentPlayerOrder: ['b', 'c', 'd', 'a'],
      currentRound: 2,
      bid: {a: 0, b: 1, c: 1, d: 1},
      win: {a: 1, b: 0, c: 0}
    }
  }
  const source = [
    {value: 0, label: '0'},
    {value: 1, label: '1'},
    {value: 2, label: '2'}
  ]
  const restWin = [
    {value: 0, label: '0'},
    {value: 1, label: '1'},
    {value: 2, label: '2', disabled: true}
  ]
  const expected = genMap(source, restWin, restWin, restWin)
  const actual = winStackInputSourceSelector(state)
  t.deepEqual(actual, expected, 'Exceed win should be disabled')
})
