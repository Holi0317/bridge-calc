import {setStartingRoundAction} from './set-starting-round'
import {ActionTypes} from '../../action-types'

test('it should return set starting round action', () => {
  const expected = {
    type: ActionTypes.SET_STARTING_ROUND,
    payload: 3
  }
  const actual = setStartingRoundAction(3)
  expect(actual).toEqual(expected)
})
