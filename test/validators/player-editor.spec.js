import {t as trans} from '../helpers/translate'
import {genMap} from '../fixtures/current-game-states'
import {playerEditorValidator} from '../../src/validators/player-editor'

test('No error for normal names', () => {
  const expected = {
    names: {},
    misc: ''
  }
  const opts = {
    names: genMap('John', 'Mary', 'Henry', 'Joe')
  }
  const actual = playerEditorValidator(opts, trans)
  expect(actual).toEqual(expected)
})

test('Error on repeated names', () => {
  const expected = {
    names: {a: 'Name cannot be repeated', b: 'Name cannot be repeated'},
    misc: ''
  }
  const opts = {
    names: genMap('John', 'John', 'Henry', 'Joe')
  }
  const actual = playerEditorValidator(opts, trans)
  expect(actual).toEqual(expected)
})

test('Error on Names that is empty', () => {
  const expected = {
    names: {c: 'Name cannot be empty', d: 'Name cannot be empty'},
    misc: ''
  }
  const opts = {
    names: genMap('John', 'Mary', '', '')
  }
  const actual = playerEditorValidator(opts, trans)
  expect(actual).toEqual(expected)
})

test('Error on misc when there is no player', () => {
  const expected = {
    names: {},
    misc: 'At least 2 players is required for a game'
  }
  const opts = {
    names: {}
  }
  const actual = playerEditorValidator(opts, trans)
  expect(actual).toEqual(expected)
})

test('Error on misc when there is 1 player', () => {
  const expected = {
    names: {},
    misc: 'At least 2 players is required for a game'
  }
  const opts = {
    names: {a: 'DPGJW'}
  }
  const actual = playerEditorValidator(opts, trans)
  expect(actual).toEqual(expected)
})

test('Error on both misc and player when the only player have empty name', () => {
  const expected = {
    names: {a: 'Name cannot be empty'},
    misc: 'At least 2 players is required for a game'
  }
  const opts = {
    names: {a: ''}
  }
  const actual = playerEditorValidator(opts, trans)
  expect(actual).toEqual(expected)
})
