import {win, WIN} from './win'
import {genMap} from '../../../test-fixtures/current-game-states'
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

test('it should return win action', () => {
  const expected = {
    type: WIN,
    win: genMap(0, 0, 0, 0),
    time: new Date()
  }
  const actual = win(genMap(0, 0, 0, 0))
  expect(actual).toEqual(expected)
})

test('it should return win action with no payload', () => {
  const expected = {
    type: WIN,
    time: new Date()
  }
  const actual = win()
  expect(actual).toEqual(expected)
})
