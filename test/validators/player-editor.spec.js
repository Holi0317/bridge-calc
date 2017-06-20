import test from 'ava'
import {t as trans} from '../helpers/translate'
import {genMap} from '../fixtures/current-game-states'
import {playerEditorValidator} from '../../src/validators/player-editor'

test('No error for normal names', t => {
  const expected = {
    names: {},
    misc: ''
  }
  const opts = {
    names: genMap('John', 'Mary', 'Henry', 'Joe'),
  }
  const actual = playerEditorValidator(opts, trans)
  t.deepEqual(actual, expected, 'No error should exist on normal player names')
})

test('Error on repeated names', t => {
  const expected = {
    names: {a: 'Name cannot be repeated', b: 'Name cannot be repeated'},
    misc: ''
  }
  const opts = {
    names: genMap('John', 'John', 'Henry', 'Joe')
  }
  const actual = playerEditorValidator(opts, trans)
  t.deepEqual(actual, expected, 'Error should exist in repeated name')
})

test('Error on Names that is empty', t => {
  const expected = {
    names: {c: 'Name cannot be empty', d: 'Name cannot be empty'},
    misc: ''
  }
  const opts = {
    names: genMap('John', 'Mary', '', '')
  }
  const actual = playerEditorValidator(opts, trans)
  t.deepEqual(actual, expected, 'Empty name should cause error')
})

test('Error on misc when there is no player', t => {
  const expected = {
    names: {},
    misc: 'At least 2 players is required for a game'
  }
  const opts = {
    names: {}
  }
  const actual = playerEditorValidator(opts, trans)
  t.deepEqual(actual, expected, 'Error should be deployed on misc property')
})

test('Error on misc when there is 1 player', t => {
  const expected = {
    names: {},
    misc: 'At least 2 players is required for a game'
  }
  const opts = {
    names: {a: 'DPGJW'}
  }
  const actual = playerEditorValidator(opts, trans)
  t.deepEqual(actual, expected, 'Error should be deployed on misc property')
})

test('Error on both misc and player when the only player have empty name', t => {
  const expected = {
    names: {a: 'Name cannot be empty'},
    misc: 'At least 2 players is required for a game'
  }
  const opts = {
    names: {a: ''}
  }
  const actual = playerEditorValidator(opts, trans)
  t.deepEqual(actual, expected, 'Both error should exist')
})
