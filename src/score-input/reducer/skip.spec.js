import {skip} from './skip'
import {waitingBidState, waitingWinState} from '../../../test-fixtures/current-game-states'

// Just being lazy
const time = new Date(1)

test('it should do no-op when n=0', () => {
  const state = {
    ...waitingBidState
  }
  const n = 0
  const expected = {
    ...waitingBidState
  }
  const actual = skip(state, n, time)
  expect(actual).toEqual(expected)
})

test('it should do no-op when n is negative', () => {
  const state = {
    ...waitingBidState
  }
  const n = -5
  const expected = {
    ...waitingBidState
  }
  const actual = skip(state, n, time)
  expect(actual).toEqual(expected)
})

test('it should convert state to waitingBid after skipping', () => {
  const state = {
    ...waitingWinState
  }
  const n = 0
  const expected = {
    ...waitingBidState
  }
  const actual = skip(state, n, time)
  expect(actual).toEqual(expected)
})

test('it should skip rounds', () => {
  const state = {
    ...waitingBidState
  }
  const n = 5
  const actual = skip(state, n, time)
  expect(actual).toMatchSnapshot() // Manually writing expected is too exhausting
})

test('it should end game when n is larger than rounds', () => {
  const state = {
    ...waitingBidState
  }
  const n = 30
  const actual = skip(state, n, time)
  expect(actual).toMatchSnapshot() // Manually writing expected is too exhausting
})

test('it should fill 0 for scores on skipped rounds', () => {
  const state = {
    ...waitingBidState
  }
  const n = 1
  const actual = skip(state, n, time)
  expect(actual).toMatchSnapshot()
})
