// @flow
import {isOk} from '../utils'

export type EntryOptions = {
  cards: number,
  rounds: number,
  startingRound: number,
  playerNames: string[]
}

type PartialEntryOptions = {
  cards?: string,
  rounds?: string,
  startingRound?: string,
  playerNames?: string
}

function validateType(opts: EntryOptions): PartialEntryOptions {
  const checkKeys = ['cards', 'rounds', 'startingRound']
  const names = {
    cards: 'Card',
    rounds: 'Rounds',
    startingRound: 'Starting round'
  }
  const isInt = d => d > 0 && Number.isInteger(d)

  const res: PartialEntryOptions = {}
  for (const key of checkKeys) {
    const value = opts[key]
    if (!isInt(value)) {
      res[key] = `${names[key]} must be a positive integer`
    }
  }
  return res
}

function validateCards(opts: EntryOptions): PartialEntryOptions {
  return opts.playerNames.length > opts.cards
    ? {cards: 'Too few cards'}
    : {}
}

function validateRounds(opts: EntryOptions): PartialEntryOptions {
  return opts.rounds > opts.cards / opts.playerNames.length
    ? {rounds: 'Insufficient cards for that much rounds'}
    : {}
}

function validateStartingRound(opts: EntryOptions): PartialEntryOptions {
  return opts.startingRound > opts.rounds
    ? {startingRound: 'Impossible to start beyond the end of the game'}
    : {}
}

function validatePlayerNames(opts: EntryOptions): PartialEntryOptions {
  return opts.playerNames.length < 2
    ? {playerNames: 'At least 2 players is required for a game'}
    : {}
}

/**
 * Validate entry options.
 * If options are valid, an empty object will be returned.
 * Otherwise, an object with property -> error message will be returned.
 * Use utils.isOk to check if there is any error during validation process.
 * @param opts {Object} - Entry options to be validated
 * @param opts.cards {number} - Number of cards
 * @param opts.rounds {number} - Number of rounds
 * @param opts.startingRound {number} - Starting round
 * @param opts.playerNames {string[]} - List of player names
 * @returns {Object} Error of each property
 */
export function entryOptionsValidator(opts: EntryOptions): PartialEntryOptions {
  const typeRes = validateType(opts)
  if (!isOk(typeRes)) {
    return typeRes
  } else {
    return {
      ...validateCards(opts),
      ...validateRounds(opts),
      ...validateStartingRound(opts),
      ...validatePlayerNames(opts)
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
