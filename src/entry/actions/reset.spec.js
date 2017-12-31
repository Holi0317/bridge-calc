import {resetAction} from './reset'
import {ActionTypes} from '../../action-types'

test('it should return reset action', () => {
  const expected = {
    type: ActionTypes.RESET_ENTRY
  }
  const actual = resetAction()
  expect(actual).toEqual(expected)
})
