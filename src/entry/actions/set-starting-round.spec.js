import {setStartingRound, SET_STARTING_ROUND} from './set-starting-round'

test('it should return set starting round action', () => {
  const expected = {
    type: SET_STARTING_ROUND,
    payload: 3
  }
  const actual = setStartingRound(3)
  expect(actual).toEqual(expected)
})
