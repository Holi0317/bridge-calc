import {winHandler} from './win-handler'
import {genMap, waitingBidState, waitingWinState} from '../../../test-fixtures/current-game-states'
import {WIN} from '../score-input-actions'

// Just be lazy
const time = new Date(1)

test('it should do no-op when state is waitingBid', () => {
  const state = {
    ...waitingBidState
  }
  const action = {
    type: WIN,
    win: genMap(0, 0, 0, 1),
    time
  }
  const expected = {
    ...waitingBidState
  }
  const actual = winHandler(state, action)
  expect(actual).toEqual(expected)
})

test('it should use given win to calculate score', () => {
  const state = {
    ...waitingWinState
  }
  const action = {
    type: WIN,
    win: genMap(0, 0, 0, 1),
    time
  }
  const actual = winHandler(state, action)
  expect(actual).toMatchSnapshot()
})

test('it should use win in state object to calculate score when win is not given in action', () => {
  const state = {
    ...waitingWinState,
    win: genMap(1, 0, 0, 0)
  }
  const action = {
    type: WIN,
    time
  }
  const actual = winHandler(state, action)
  expect(actual).toMatchSnapshot()
})

test('it should end game when it is dispatched at last round', () => {
  const state = {
    ...waitingWinState,
    rounds: 1
  }
  const action = {
    type: WIN,
    win: genMap(1, 0, 0, 0),
    time
  }
  const actual = winHandler(state, action)
  expect(actual).toMatchSnapshot()
})
