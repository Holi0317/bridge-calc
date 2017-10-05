import {setCards, SET_CARDS} from './set-cards'

test('it should return set cards action', () => {
  const expected = {
    type: SET_CARDS,
    payload: 104
  }
  const actual = setCards(104)
  expect(actual).toEqual(expected)
})
