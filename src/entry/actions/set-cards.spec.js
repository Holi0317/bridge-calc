import {setCardsAction} from './set-cards'
import {ActionTypes} from '../../action-types'

test('it should return set cards action', () => {
  const expected = {
    type: ActionTypes.SET_CARDS,
    payload: 104
  }
  const actual = setCardsAction(104)
  expect(actual).toEqual(expected)
})
