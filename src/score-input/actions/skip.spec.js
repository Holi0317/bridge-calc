import {skipAction} from './skip'
import {ActionTypes} from '../../action-types'
import * as lolex from 'lolex'

let clock = null
beforeEach(() => {
  clock = lolex.install()
})
afterEach(() => {
  if (clock) {
    clock.uninstall()
  }
})

test('it should return a skip action', () => {
  const expected = {
    type: ActionTypes.SKIP,
    time: new Date(),
    times: 1
  }
  const actual = skipAction(1)
  expect(actual).toEqual(expected)
})

test('it should return skip action with n rounds specified', () => {
  const expected = {
    type: ActionTypes.SKIP,
    time: new Date(),
    times: 5
  }
  const actual = skipAction(5)
  expect(actual).toEqual(expected)
})
