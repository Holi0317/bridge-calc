import test from 'ava'
import {defaultOptions} from '../fixtures/entry-options'
import {t as trans} from '../helpers/translate'
import {entryOptionsValidatorSelector, validEntryOptionsSelector} from '../../src/selectors/entry-options-validator'

test('empty object should be selected for entry options with no error', t => {
  const expected = {}
  const state = {
    ui: {
      entry: {
        ...defaultOptions
      }
    }
  }
  const actual = entryOptionsValidatorSelector(state, trans)
  t.deepEqual(actual, expected, 'No error should exist in the selected')
})

test('true should be selected for entry options with no error', t => {
  const expected = true
  const state = {
    ui: {
      entry: {
        ...defaultOptions
      }
    }
  }
  const actual = validEntryOptionsSelector(state, trans)
  t.is(actual, expected, 'true should be selected as no error should exist')
})
