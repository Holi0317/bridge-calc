import test from 'ava'
import {defaultOptions} from '../fixtures/entry-options'
import {t as trans} from '../helpers/test-utils'
import {validEntryOptionsSelector} from '../../src/selectors/valid-entry-options'

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
