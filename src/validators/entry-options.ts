import {I18nT} from '../types'
import {dupe, removeUndef} from '../utils'

export interface IEntryOptions {
  playerNames: string[]
}

export interface IEntryError {
  playerNames?: string[],
  misc?: string
}

function validateMisc(opts: IEntryOptions, t: I18nT): string | null {
  return opts.playerNames.length < 2
    ? t('At least 2 players is required for a game')
    : null
}

function validatePlayerName(opts: IEntryOptions, t: I18nT): string[] | null {
  const duplicates = dupe(opts.playerNames)
  const playerNames = opts.playerNames
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
 * @param opts - Entry options to be validated
 * @param opts.playerNames - List of player names
 * @param t - i18next translate function
 * @returns {Object} Error of each property
 */
export function entryOptionsValidator(opts: IEntryOptions, t: I18nT): IEntryError {
  const res = {
    misc: validateMisc(opts, t),
    playerNames: validatePlayerName(opts, t)
  }
  return removeUndef(res)
}
