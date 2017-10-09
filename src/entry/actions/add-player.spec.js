import {ADD_PLAYER, addPlayerAction, addRandomPlayer} from './add-player'

test('it should return add player action', () => {
  const expected = {
    type: ADD_PLAYER,
    payload: 'John'
  }
  const actual = addPlayerAction('John')
  expect(actual).toEqual(expected)
})

test('addRandomPlayer should return add player action with random player name', () => {
  const actual = addRandomPlayer()
  expect(actual.type).toEqual(ADD_PLAYER)
  expect(typeof actual.payload).toEqual('string')
})
