import {SET_WIN, setWinAction} from './set-win'
import {genMap} from '../../../test-fixtures/current-game-states'

test('it should return set bid action', () => {
  const winMap = genMap(0, 0, 0, 0)
  const expected = {
    type: SET_WIN,
    payload: winMap
  }
  const actual = setWinAction(winMap)
  expect(actual).toEqual(expected)
})
