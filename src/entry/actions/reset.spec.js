import {resetAction, RESET} from './reset'

test('it should return reset action', () => {
  const expected = {
    type: RESET
  }
  const actual = resetAction()
  expect(actual).toEqual(expected)
})
