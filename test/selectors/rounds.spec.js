import test from 'ava'
import {waitingBidState} from '../fixtures/current-game-states'
import {roundsSelector} from '../../src/selectors/rounds'

test('null should be selected if currentGame is null', t => {
  const expected = null
  const state = {
    currentGame: null
  }
  const actual = roundsSelector(state)
  t.is(actual, expected, 'null should be returned')
})

test('currentRound should be selected', t => {
  const expected = 13
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = roundsSelector(state)
  t.is(actual, expected, 'rounds should be selected')
})
