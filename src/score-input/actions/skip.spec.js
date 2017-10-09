import {skipAction, SKIP} from './skip'
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
    type: SKIP,
    time: new Date()
  }
  const actual = skipAction()
  expect(actual).toEqual(expected)
})

test('it should return skip action with n rounds specified', () => {
  const expected = {
    type: SKIP,
    time: new Date(),
    times: 5
  }
  const actual = skipAction(5)
  expect(actual).toEqual(expected)
})
