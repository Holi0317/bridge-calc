import {undoAction} from './undo'
import {ActionTypes} from '../../action-types'

test('it should return undo action', () => {
  const expected = {
    type: ActionTypes.UNDO
  }
  const actual = undoAction()
  expect(actual).toEqual(expected)
})
