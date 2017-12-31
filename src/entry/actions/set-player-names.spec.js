import {setPlayerNamesAction} from './set-player-names'
import {ActionTypes} from '../../action-types'

test('it should return set player names action', () => {
  const expected = {
    type: ActionTypes.SET_PLAYER_NAMES,
    payload: ['John']
  }
  const actual = setPlayerNamesAction(['John'])
  expect(actual).toEqual(expected)
})
