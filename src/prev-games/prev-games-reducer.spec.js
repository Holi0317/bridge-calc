import {prevGamesReducer as reducer} from './prev-games-reducer'
import {addGameAction} from './actions/add-game'
import {deleteGameAction} from './actions/delete-game'
import {resetGamesAtion} from './actions/reset-games'
import {saveGameAction} from './actions/save-game'
import {endedState, waitingBidState, waitingWinState} from '../../test-fixtures/current-game-states'

test('Default state', () => {
  const expected = {
    prevGames: []
  }
  const action = {
    type: '#NULL'
  }
  const actual = reducer(undefined, action)
  expect(actual).toEqual(expected)
})

test('add game action should prepend game to the head of prev games array', () => {
  const expected = {
    prevGames: ['a', 'b', 'c', 'd']
  }
  const state = {
    prevGames: ['a', 'b', 'c']
  }
  const action = addGameAction('d')
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('delete game action should remove give game ID from prev games array', () => {
  const expected = {
    prevGames: ['a', 'c']
  }
  const state = {
    prevGames: ['a', 'b', 'c']
  }
  const action = deleteGameAction(1)
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('delete game action should do nothing if given game ID is not found', () => {
  const expected = {
    prevGames: ['a', 'b', 'c']
  }
  const state = {
    prevGames: ['a', 'b', 'c']
  }
  const action = deleteGameAction(3)
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('State should reset after reset action is fired', () => {
  const expected = {
    prevGames: []
  }
  const state = {
    prevGames: [{}]
  }
  const action = resetGamesAtion()
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('no-op should be done for empty payload in saveGame', () => {
  const expected = {
    prevGames: []
  }
  const state = {
    prevGames: []
  }
  const action = saveGameAction(null)
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('save game should append new game to the end of array', () => {
  const oldPrevGameEntry = {
    ...waitingWinState,
    id: 'notMatch'
  }
  const newPrevGameEntry = {
    ...waitingBidState
  }
  const expected = {
    prevGames: [oldPrevGameEntry, newPrevGameEntry]
  }
  const state = {
    prevGames: [oldPrevGameEntry]
  }
  const action = saveGameAction(newPrevGameEntry)
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('save game should change content of saved game if game already in store', () => {
  const oldEntry = {
    ...waitingBidState
  }
  const newEntry = {
    ...waitingWinState
  }
  const fakeEntry = {
    ...endedState,
    id: 'Fake, does not match'
  }
  const expected = {
    prevGames: [newEntry, fakeEntry]
  }
  const state = {
    prevGames: [oldEntry, fakeEntry]
  }
  const action = saveGameAction(newEntry)
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})
