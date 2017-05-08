// @flow
import {createSelector} from 'reselect'
import {entryOptionsValidatorSelector} from './entry-options-validator'
import {isOk} from '../utils'

import type {EntryError} from '../validators/entry-options'

/**
 * Select validity of entry options.
 * If valid, the selected value will be true.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const validEntryOptionsSelector = createSelector(
  entryOptionsValidatorSelector,
  (error: EntryError) => isOk(error)
)
