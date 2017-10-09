import {undo, UNDO} from './undo'

test('it should return undo action', () => {
  const expected = {
    type: UNDO
  }
  const actual = undo()
  expect(actual).toEqual(expected)
})
