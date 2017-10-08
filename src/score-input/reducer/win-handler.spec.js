import {winHandler} from './win-handler'
import {win} from '../actions/win'
import {genMap, waitingBidState, waitingWinState} from '../../../test-fixtures/current-game-states'
import * as lolex from 'lolex'

test('it should do no-op when state is waitingBid', () => {
  const state = {
    ...waitingBidState
  }
  const action = win(genMap(0, 0, 0, 1))
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
  const action = win(genMap(0, 0, 0, 1))
  const actual = winHandler(state, action)
  expect(actual).toMatchSnapshot()
})

test('it should use win in state object to calculate score when win is not given in action', () => {
  const state = {
    ...waitingWinState,
    win: genMap(1, 0, 0, 0)
  }
  const action = win()
  const actual = winHandler(state, action)
  expect(actual).toMatchSnapshot()
})

test('it should end game when it is dispatched at last round', () => {
  const clock = lolex.install()

  const state = {
    ...waitingWinState,
    rounds: 1
  }
  const action = win(genMap(1, 0, 0, 0))
  const actual = winHandler(state, action)
  expect(actual).toMatchSnapshot()

  clock.uninstall()
})
