import {SAVE_GAME, saveGameAction} from './save-game'
import {endedState} from '../../../test-fixtures/current-game-states'

test('no entry should be populated for null game state', () => {
  const expected = {
    type: SAVE_GAME,
    entry: null
  }
  const actual = saveGameAction(null)
  expect(actual).toEqual(expected)
})

test('it should fill in entry property with PrevGame', () => {
  const expected = {
    type: SAVE_GAME,
    entry: endedState
  }
  const actual = saveGameAction(endedState)
  expect(actual).toEqual(expected)
})
