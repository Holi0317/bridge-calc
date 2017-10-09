import {setPlayerNamesAction, SET_PLAYER_NAMES} from './set-player-names'

test('it should return set player names action', () => {
  const expected = {
    type: SET_PLAYER_NAMES,
    payload: ['John']
  }
  const actual = setPlayerNamesAction(['John'])
  expect(actual).toEqual(expected)
})
