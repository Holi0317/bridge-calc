import {setRounds, SET_ROUNDS} from './set-rounds'

test('it should return set rounds action', () => {
  const expected = {
    type: SET_ROUNDS,
    payload: 8
  }
  const actual = setRounds(8)
  expect(actual).toEqual(expected)
})
