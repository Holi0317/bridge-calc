import {bidAction, BID} from './bid'
import {genMap} from '../../../test-fixtures/current-game-states'

test('it should return bid action', () => {
  const expected = {
    type: BID,
    payload: genMap(0, 0, 0, 0)
  }
  const actual = bidAction(genMap(0, 0, 0, 0))
  expect(actual).toEqual(expected)
})

test('it should return bid action with no payload', () => {
  const expected = {
    type: BID
  }
  const actual = bidAction()
  expect(actual).toEqual(expected)
})
