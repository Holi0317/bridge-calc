import {addGameAction, ADD_GAME} from './add-game'

test('it should return add game action', () => {
  const expected = {
    type: ADD_GAME,
    payload: {
      type: 'IPrevGameEntry' // Just be lazy
    }
  }
  const actual = addGameAction({
    type: 'IPrevGameEntry'
  })
  expect(actual).toEqual(expected)
})
