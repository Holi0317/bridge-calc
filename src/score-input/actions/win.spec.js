import {winAction} from './win'
import {ActionTypes} from '../../action-types'
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
    type: ActionTypes.WIN,
    win: genMap(0, 0, 0, 0),
    time: new Date()
  }
  const actual = winAction(genMap(0, 0, 0, 0))
  expect(actual).toEqual(expected)
})

test('it should return win action with no payload', () => {
  const expected = {
    type: ActionTypes.WIN,
    time: new Date()
  }
  const actual = winAction()
  expect(actual).toEqual(expected)
})
