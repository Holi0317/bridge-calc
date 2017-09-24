import {createSelector} from 'reselect'
import {entryOptionsValidator, IEntryError} from '../../validators/entry-options'
import {isOk} from '../../utils'
import {IRootState, I18nT} from '../../types'
import {IEntryState} from '../../entry/entry-reducer'

/**
 * Select validation result of entry options.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const entryOptionsValidatorSelector = createSelector(
  (state: IRootState) => state.ui.entry,
  (state: IRootState, t: I18nT) => t,
  (entry: IEntryState, t: I18nT): IEntryError =>
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
