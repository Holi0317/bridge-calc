import {waitingBidState} from '../../fixtures/current-game-states'
import {GameStage} from '../../../src/game-stage'
import {stageSelector} from '../../../src/selectors/current-game/stage'

test('null should be selected when currentGame is null', () => {
  const expected = null
  const state = {
    currentGame: null
  }
  const actual = stageSelector(state)
  expect(actual).toBe(expected)
})

test('stage should be selected when there is currentGame', () => {
  const expected = GameStage.waitingBid
  const state = {
    currentGame: {
      ...waitingBidState
    }
  }
  const actual = stageSelector(state)
  expect(actual).toBe(expected)
})
