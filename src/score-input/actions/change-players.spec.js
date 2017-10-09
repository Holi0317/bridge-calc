import {CHANGE_PLAYERS, changePlayersAction} from './change-players'
import {genMap} from '../../../test-fixtures/current-game-states'
import * as lolex from 'lolex'

test('it should return change players action', () => {
  const clock = lolex.install()
  const newNames = genMap('John', 'Mary', 'Henry', 'Joe')
  const expected = {
    type: CHANGE_PLAYERS,
    newNames,
    maker: 'a',
    rounds: 13,
    time: new Date()
  }
  const actual = changePlayersAction(newNames, 'a', 13)
  expect(actual).toEqual(expected)
  clock.uninstall()
})
