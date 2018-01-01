import {ActionTypes} from '../../action-types'
import {setImportOpenAction, setPlayerNamesAction, setRoundsAction, setStartingRoundAction} from './set-entry-props'

test('set rounds should produce correct action', () => {
  const expected = {
    type: ActionTypes.SET_ENTRY_PROPS,
    rounds: 8
  }
  const actual = setRoundsAction(8)
  expect(actual).toEqual(expected)
})

test('it should return set starting round action', () => {
  const expected = {
    type: ActionTypes.SET_ENTRY_PROPS,
    startingRound: 3
  }
  const actual = setStartingRoundAction(3)
  expect(actual).toEqual(expected)
})

test('it should produce set import open action', () => {
  const expected = {
    type: ActionTypes.SET_ENTRY_PROPS,
    importOpened: true
  }
  const actual = setImportOpenAction(true)
  expect(actual).toEqual(expected)
})

test('it should produce set player names action', () => {
  const expected = {
    type: ActionTypes.SET_ENTRY_PROPS,
    playerNames: ['John']
  }
  const actual = setPlayerNamesAction(['John'])
  expect(actual).toEqual(expected)
})
