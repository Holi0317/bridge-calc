import {start} from './start'
import {START} from '../score-input-actions'
import {startParams, waitingBidState} from '../../../test-fixtures/current-game-states'

test('it should generate state according to action', () => {
  const action = {
    ...startParams,
    type: START
  }
  const expected = {
    ...waitingBidState
  }
  const actual = start(action)
  expect(actual).toEqual(expected)
})

test('Starting in the middle of the game should work', () => {
  const action = {
    ...startParams,
    type: START,
    startingRound: 5
  }
  const actual = start(action)
  expect(actual).toMatchSnapshot()
})
