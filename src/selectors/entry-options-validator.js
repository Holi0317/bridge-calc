// @flow
import {createSelector} from 'reselect'
import {entryOptionsValidator} from '../validators/entry-options'

import type {RootState, T} from '../types'
import type {EntryState} from '../reducer/ui/entry'

/**
 * Select validation result of entry options.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const entryOptionsValidatorSelector = createSelector(
  (state: RootState) => state.ui.entry,
  (state: RootState, t: T) => t,
  (entry: EntryState, t: T) => entryOptionsValidator(entry, t)
)
