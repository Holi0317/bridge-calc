import {createSelector} from 'reselect'
import {isSettingsValid} from '../settings-validator'
import {namesChangedSelector} from './names-changed'
import {isMakerCleanSelector} from './is-maker-clean'

/**
 * Determine if current state allows changing player name in currentGame
 * Requirements:
 * 1. Player name has changed in settings state; and
 * 2. No error in validation; and
 * 3. Maker chooser is clean, not touched
 *
 * If requirements are met, true will be returned.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const allowNamesCommitSelector = createSelector(
  namesChangedSelector,
  isSettingsValid,
  isMakerCleanSelector,
  (namesChanged: boolean, isValid: boolean, isMakerClean: boolean) =>
    namesChanged && isValid && isMakerClean
)
