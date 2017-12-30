import {setRoundsAction} from './set-rounds'
import {ActionTypes} from '../../action-types'

test('it should return set rounds action', () => {
  const expected = {
    type: ActionTypes.SET_ROUNDS,
    payload: 8
  }
  const actual = setRoundsAction(8)
  expect(actual).toEqual(expected)
})
