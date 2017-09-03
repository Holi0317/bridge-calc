import {isValidPlayerEditor, playerEditorValidatorSelector} from '../../../src/selectors/validators/player-editor'
import {genMap} from '../../fixtures/current-game-states'
import {t as trans} from '../../helpers/translate'

test('Validation result should be returned', () => {
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
  expect(actual).toEqual(expected)
})

test('isValidPlayerEditor should be true for valid data', () => {
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
  expect(actual).toBe(expected)
})

test('isValidPlayerEditor should be false for invalid data in misc', () => {
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
  expect(actual).toBe(expected)
})

test('isValidPlayerEditor should be false for invalid data in names', () => {
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
  expect(actual).toBe(expected)
})
