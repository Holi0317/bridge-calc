import {gameStateToPrevGame, prevGameToGameState} from './converter'
import {waitingBidState, waitingWinState} from '../../test-fixtures/current-game-states'

test('gameStateToPrevGame should throw error for null game state', () => {
  const fn = () => gameStateToPrevGame(null)
  expect(fn).toThrow(TypeError)
})

test('gameStateToPrevGame should return PrevGame for given state', () => {
  const expected = {
    ...waitingBidState
  }
  const actual = gameStateToPrevGame(waitingBidState)
  expect(actual).toEqual(expected)
})

test('prevGameToGameState should return GameState for given PrevGame', () => {
  const expected = {
    ...waitingWinState
  }
  const actual = prevGameToGameState(waitingWinState)
  expect(actual).toEqual(expected)
})
