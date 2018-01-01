import {showContinueSelector} from './show-continue-selector'
import {endedState, waitingBidState, waitingWinState} from '../../test-fixtures/current-game-states'

test('it should be false for null currentGame', () => {
  const tree = {
    currentGame: null
  }
  const expected = false
  const actual = showContinueSelector(tree)
  expect(actual).toEqual(expected)
})

test('it should be false for ended currentGame', () => {
  const tree = {
    currentGame: endedState
  }
  const expected = false
  const actual = showContinueSelector(tree)
  expect(actual).toEqual(expected)
})

test('it should be true for waitingBid', () => {
  const tree = {
    currentGame: waitingBidState
  }
  const expected = true
  const actual = showContinueSelector(tree)
  expect(actual).toEqual(expected)
})

test('it should be true for waitingWin', () => {
  const tree = {
    currentGame: waitingWinState
  }
  const expected = true
  const actual = showContinueSelector(tree)
  expect(actual).toEqual(expected)
})
