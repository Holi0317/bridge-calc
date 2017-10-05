import {createSelector} from 'reselect'
import {TranslationFunction} from 'i18next'
import {dupe, removeUndef, isOk} from '../utils'
import {IRootState} from '../types'

const playerUpperLimit = 52

export interface IEntryError {
  playerNames?: string[],
  misc?: string
}

function validateMisc(playerNames: string[], t: TranslationFunction): string | null {
  if (playerNames.length < 2) {
    return t('At least 2 players is required for a game')
  } else if (playerNames.length > playerUpperLimit) {
    return t('Too many players. Upper limit is {{limit}} players.', {limit: playerUpperLimit})
  }
  return null
}

function validatePlayerName(rawNames: string[], t: TranslationFunction): string[] | null {
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
 */
export const entryOptionsValidator = createSelector(
  (state: IRootState) => state.entry.playerNames,
  (state: IRootState, t: TranslationFunction) => t,
  (playerNames: string[], t: TranslationFunction): IEntryError => {
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
