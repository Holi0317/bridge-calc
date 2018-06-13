import {prevGamesReducer as reducer} from './prev-games-reducer'
import {addGameAction} from './actions/add-game'
import {deleteGameAction} from './actions/delete-game'
import {resetGamesAtion} from './actions/reset-games'
import {saveGameAction} from './actions/save-game'
import {showGameModalAction, closeGameModalAction} from './actions/game-modal'
import {endedState, waitingBidState, waitingWinState} from '../../test-fixtures/current-game-states'

const defaultState = {
  prevGames: [],
  modalEntry: null
}

test('Default state', () => {
  const expected = defaultState
  const action = {
    type: '#NULL'
  }
  const actual = reducer(undefined, action)
  expect(actual).toEqual(expected)
})

test('add game action should prepend game to the head of prev games array', () => {
  const expected = {
    ...defaultState,
    prevGames: ['a', 'b', 'c', 'd']
  }
  const state = {
    ...defaultState,
    prevGames: ['a', 'b', 'c']
  }
  const action = addGameAction('d')
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('delete game action should remove give game ID from prev games array', () => {
  const expected = {
    ...defaultState,
    prevGames: ['a', 'c']
  }
  const state = {
    ...defaultState,
    prevGames: ['a', 'b', 'c']
  }
  const action = deleteGameAction(1)
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('delete game action should do nothing if given game ID is not found', () => {
  const expected = {
    ...defaultState,
    prevGames: ['a', 'b', 'c']
  }
  const state = {
    ...defaultState,
    prevGames: ['a', 'b', 'c']
  }
  const action = deleteGameAction(3)
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('State should reset after reset action is fired', () => {
  const expected = {
    ...defaultState,
    prevGames: []
  }
  const state = {
    ...defaultState,
    prevGames: [{}],
    modalEntry: 1
  }
  const action = resetGamesAtion()
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('no-op should be done for empty payload in saveGame', () => {
  const expected = {
    ...defaultState,
    prevGames: []
  }
  const state = {
    ...defaultState,
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
    ...defaultState,
    prevGames: [oldPrevGameEntry, newPrevGameEntry]
  }
  const state = {
    ...defaultState,
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
    ...defaultState,
    prevGames: [newEntry, fakeEntry]
  }
  const state = {
    ...defaultState,
    prevGames: [oldEntry, fakeEntry]
  }
  const action = saveGameAction(newEntry)
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('game modal should point to given index for opening', () => {
  const expected = {
    ...defaultState,
    modalEntry: 1
  }
  const state = {
    ...defaultState
  }
  const action = showGameModalAction(1)
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})

test('game modal should close when close modal action is fired', () => {
  const expected = {
    ...defaultState,
    modalEntry: null
  }
  const state = {
    ...defaultState,
    modalEntry: 1
  }
  const action = closeGameModalAction()
  const actual = reducer(state, action)
  expect(actual).toEqual(expected)
})
