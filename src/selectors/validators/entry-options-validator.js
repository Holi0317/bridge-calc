// @flow
import {createSelector} from 'reselect'
import {entryOptionsValidator} from '../../validators/entry-options'
import {isOk} from '../../utils'

import type {RootState, I18nT} from '../../types'
import type {EntryState} from '../../reducer/ui/entry'
import type {IEntryError} from '../../validators/entry-options'

/**
 * Select validation result of entry options.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const entryOptionsValidatorSelector = createSelector(
  (state: RootState) => state.ui.entry,
  (state: RootState, t: I18nT) => t,
  (entry: EntryState, t: I18nT): IEntryError =>
    entryOptionsValidator(entry, t)
)

/**
 * Select validity of entry options.
 * If valid, the selected value will be true.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const validEntryOptionsSelector = createSelector(
  entryOptionsValidatorSelector,
  (error: IEntryError): boolean =>
    isOk(error)
)
