import test from 'ava'
import {waitingBidState} from '../fixtures/current-game-states'
import {GameStage} from '../../src/game-stage'
import {stageSelector} from '../../src/selectors/stage'

test('null should be selected when currentGame is null', t => {
  const expected = null
  const state = {
    currentGame: null
  }
  const actual = stageSelector(state)
  t.is(actual, expected, 'null should be selected')
})

test('stage should be selected when there is currentGame', t => {
  const expected = GameStage.waitingBid
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = stageSelector(state)
  t.is(actual, expected, ' stage should be selected')
})
