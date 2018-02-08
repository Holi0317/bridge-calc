import {start} from './start'

import {startAction as startAction} from '../actions/start'
import * as lolex from 'lolex'

jest.mock('cuid', () => {
  let count = 0
  return jest.fn(() => '' + count++)
})

const playerNames = ['John', 'Mary', 'Henry', 'Joe']

let clock = null
beforeEach(() => {
  clock = lolex.install()
})
afterEach(() => {
  if (clock) {
    clock.uninstall()
  }
})

test('it should generate state according to action', () => {
  const action = startAction(13, playerNames, 1)
  const actual = start(action)
  expect(actual).toMatchSnapshot()
})

test('Starting in the middle of the game should work', () => {
  const action = startAction(13, playerNames, 5)
  const actual = start(action)
  expect(actual).toMatchSnapshot()
})
