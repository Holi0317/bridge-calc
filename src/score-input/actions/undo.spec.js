import {undoAction, UNDO} from './undo'

test('it should return undo action', () => {
  const expected = {
    type: UNDO
  }
  const actual = undoAction()
  expect(actual).toEqual(expected)
})
