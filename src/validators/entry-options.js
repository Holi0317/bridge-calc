// @flow
import {isOk} from '../utils'

import type {T} from '../i18n'

export type EntryOptions = {
  cards: number,
  rounds: number,
  startingRound: number,
  playerNames: string[]
}

type EntryError = {
  cards?: string,
  rounds?: string,
  startingRound?: string,
  playerNames?: string[],
  misc?: string
}

function validateType(opts, t): EntryError {
  const checkKeys = ['cards', 'rounds', 'startingRound']
  const names = {
    cards: t('Cards'),
    rounds: t('Rounds'),
    startingRound: t('Starting round')
  }
  const isInt = d => d > 0 && Number.isInteger(d)

  const res: EntryError = {}
  for (const key of checkKeys) {
    const value = opts[key]
    if (!isInt(value)) {
      res[key] = t('{{property}} must be a positive integer', {property: names[key]})
    }
  }
  return res
}

function validateCards(opts, t): EntryError {
  return opts.playerNames.length > opts.cards
    ? {cards: t('Too few cards')}
    : {}
}

function validateRounds(opts, t): EntryError {
  return opts.rounds > opts.cards / opts.playerNames.length
    ? {rounds: t('Insufficient cards for that much rounds')}
    : {}
}

function validateStartingRound(opts, t): EntryError {
  return opts.startingRound > opts.rounds
    ? {startingRound: t('Impossible to start beyond the end of the game')}
    : {}
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
 * @param opts.cards - Number of cards
 * @param opts.rounds - Number of rounds
 * @param opts.startingRound - Starting round
 * @param opts.playerNames - List of player names
 * @param t - i18next translate function
 * @returns {Object} Error of each property
 */
export function entryOptionsValidator(opts: EntryOptions, t: T = (a => a)): EntryError {
  const typeRes = validateType(opts, t)
  if (!isOk(typeRes)) {
    return typeRes
  } else {
    return {
      ...validateCards(opts, t),
      ...validateRounds(opts, t),
      ...validateStartingRound(opts, t),
      ...validateMisc(opts, t),
      ...validatePlayerName(opts, t)
    }
  }
}
/**
 * Test if the give argument is a positive integer or not.
 * Exception: empty string is consider as a valid integer.
 * Because empty string should be allowed in input field.
 * @param str {string}
 * @returns {boolean}
 */
export function isInteger(str: string) {
  const regex = /^[1-9]\d*$/
  return str === '' || regex.test(str)
}
