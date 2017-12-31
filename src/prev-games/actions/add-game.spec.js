import {addGameAction} from './add-game'
import {ActionTypes} from '../../action-types'

test('it should return add game action', () => {
  const expected = {
    type: ActionTypes.ADD_GAME,
    payload: {
      type: 'IPrevGameEntry' // Just be lazy
    }
  }
  const actual = addGameAction({
    type: 'IPrevGameEntry'
  })
  expect(actual).toEqual(expected)
})
