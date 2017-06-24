import test from 'ava'
import {isValidPlayerEditor, playerEditorValidatorSelector} from '../../../src/selectors/validators/player-editor'
import {genMap} from '../../fixtures/current-game-states'
import {t as trans} from '../../helpers/translate'

test('Validation result should be returned', t => {
  const state = {
    ui: {
      settings: {
        names: genMap('John', 'Mary', 'Henry', 'Joe'),
        maker: 'a'
      }
    }
  }
  const expected = {
    names: {},
    misc: ''
  }
  const actual = playerEditorValidatorSelector(state, trans)
  t.deepEqual(actual, expected, 'Validation result should be selected')
})

test('isValidPlayerEditor should be true for valid data', t => {
  const state = {
    ui: {
      settings: {
        names: genMap('John', 'Mary', 'Henry', 'Joe'),
        maker: 'a'
      }
    }
  }
  const expected = true
  const actual = isValidPlayerEditor(state, trans)
  t.is(actual, expected, 'True should be selected for valid data')
})

test('isValidPlayerEditor should be false for invalid data in misc', t => {
  const state = {
    ui: {
      settings: {
        names: {},
        maker: null
      }
    }
  }
  const expected = false
  const actual = isValidPlayerEditor(state, trans)
  t.is(actual, expected, 'False should be selected for invalid data')
})

test('isValidPlayerEditor should be false for invalid data in names', t => {
  const state = {
    ui: {
      settings: {
        names: genMap('John', 'Mary', 'Mary', 'Joe'),
        maker: 'a'
      }
    }
  }
  const expected = false
  const actual = isValidPlayerEditor(state, trans)
  t.is(actual, expected, 'False should be selected for valid data')
})
