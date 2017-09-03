import {defaultOptions} from '../../fixtures/entry-options'
import {t as trans} from '../../helpers/translate'
import {entryOptionsValidatorSelector, validEntryOptionsSelector} from '../../../src/selectors/validators/entry-options-validator'

test('empty object should be selected for entry options with no error', () => {
  const expected = {}
  const state = {
    ui: {
      entry: {
        ...defaultOptions
      }
    }
  }
  const actual = entryOptionsValidatorSelector(state, trans)
  expect(actual).toEqual(expected)
})

test('true should be selected for entry options with no error', () => {
  const expected = true
  const state = {
    ui: {
      entry: {
        ...defaultOptions
      }
    }
  }
  const actual = validEntryOptionsSelector(state, trans)
  expect(actual).toBe(expected)
})
