// @flow
import {createSelector} from 'reselect'
import {entryOptionsValidator} from '../validators/entry-options'
import {isOk} from '../utils'

import type {RootState, T} from '../types'
import type {EntryState} from '../reducer/ui/entry'
import type {EntryError} from '../validators/entry-options'

/**
 * Select validation result of entry options.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const entryOptionsValidatorSelector = createSelector(
  (state: RootState) => state.ui.entry,
  (state: RootState, t: T) => t,
  (entry: EntryState, t: T): EntryError =>
    entryOptionsValidator(entry, t)
)

/**
 * Select validity of entry options.
 * If valid, the selected value will be true.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const validEntryOptionsSelector = createSelector(
  entryOptionsValidatorSelector,
  (error: EntryError): boolean =>
    isOk(error)
)
