import {I18nT, IRootState} from '../types'
import {dupe, removeUndef, isOk} from '../utils'
import {createSelector} from 'reselect'

const playerUpperLimit = 52

export interface IEntryError {
  playerNames?: string[],
  misc?: string
}

function validateMisc(playerNames: string[], t: I18nT): string | null {
  if (playerNames.length < 2) {
    return t('At least 2 players is required for a game')
  } else if (playerNames.length > playerUpperLimit) {
    return t('Too many players. Upper limit is {{limit}} players.', {limit: playerUpperLimit})
  }
  return null
}

function validatePlayerName(rawNames: string[], t: I18nT): string[] | null {
  const duplicates = dupe(rawNames)
  const playerNames = rawNames
    .map(p => (
      (p == null || p === '')
        ? t('Name cannot be empty')
        : (duplicates.includes(p))
          ? t('Name cannot be repeated')
          : ''
    ))
  const isEmpty = playerNames.filter(p => p !== '').length === 0
  return isEmpty
    ? null
    : playerNames
}

/**
 * Validate entry options.
 * If options are valid, an empty object will be returned.
 * Otherwise, an object with property -> error message will be returned.
 * Use utils.isOk to check if there is any error during validation process.
 * Additional argument: i18next T object must be passed in as second argument.
 * @param playerNames - List of player names
 * @param t - i18next translate function
 * @returns {Object} Error of each property
 */
export const entryOptionsValidator = createSelector(
  (state: IRootState) => state.ui.entry.playerNames,
  (state: IRootState, t: I18nT) => t,
  (playerNames: string[], t: I18nT): IEntryError => {
    const res = {
      misc: validateMisc(playerNames, t),
      playerNames: validatePlayerName(playerNames, t)
    }
    return removeUndef(res)
  }
)

/**
 * Select validity of entry options.
 * If valid, the selected value will be true.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const isEntryOptionsValid = createSelector(
  entryOptionsValidator,
  (error: IEntryError): boolean =>
    isOk(error)
)
