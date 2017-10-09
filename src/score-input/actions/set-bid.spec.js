import {SET_BID, setBidAction} from './set-bid'
import {genMap} from '../../../test-fixtures/current-game-states'

test('it should return set bid action', () => {
  const bidMap = genMap(0, 0, 0, 0)
  const expected = {
    type: SET_BID,
    payload: bidMap
  }
  const actual = setBidAction(bidMap)
  expect(actual).toEqual(expected)
})
