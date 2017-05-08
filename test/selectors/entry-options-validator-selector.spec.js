import test from 'ava'
import {defaultOptions} from '../fixtures/entry-options'
import {t as trans} from '../helpers/test-utils'
import {entryOptionsValidatorSelector} from '../../src/selectors/entry-options-validator'

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
