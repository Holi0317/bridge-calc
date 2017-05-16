// @flow
import type {T} from '../types'

export type EntryOptions = {
  playerNames: string[]
}

export type EntryError = {
  playerNames?: string[],
  misc?: string
}

function validateMisc(opts, t): EntryError {
  return opts.playerNames.length < 2
    ? {misc: t('At least 2 players is required for a game')}
    : {}
}

function validatePlayerName(opts, t): EntryError {
  const playerNames = opts.playerNames
    .map(p => p == null || p === '' ? t('Name cannot be empty') : '')
  const isEmpty = playerNames.filter(p => p !== '').length === 0
  return isEmpty
    ? {}
    : {playerNames}
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
export function entryOptionsValidator(opts: EntryOptions, t: T): EntryError {
  return {
    ...validateMisc(opts, t),
    ...validatePlayerName(opts, t)
  }
}

/**
 * Regex for isInteger test
 * @type {RegExp}
 */
const regex = /^\d*$/

/**
 * Test if the give argument is a positive integer or not.
 * Exception: empty string is consider as a valid integer.
 * Because empty string should be allowed in input field.
 * @param str {string}
 * @returns {boolean}
 */
export function isInteger(str: string) {
  if (str === '' || str === '0') {
    return true
  } else if (str.startsWith('0')) {
    return false
  }
  return regex.test(str)
}
