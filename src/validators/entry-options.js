import {isOk} from '../utils'

function validateType(opts) {
  const checkKeys = ['cards', 'rounds', 'startingRound']
  const names = {
    cards: 'Card',
    rounds: 'Rounds',
    startingRound: 'Starting round'
  }
  const isInt = d => d > 0 && Number.isInteger(d)
  return checkKeys.map(k => [k, opts[k]])
    .map(([key, value]) => [key, isInt(value) ? null : `${names[key]} must be a positive integer`])
    .filter(k => k[1] != null)
    .reduce((res, [key, value]) => ({
      ...res,
      [key]: value
    }), {})
}

function validateCards(opts) {
  return opts.playerNames.length > opts.cards
    ? {cards: 'Too few cards'}
    : {}
}

function validateRounds(opts) {
  return opts.rounds > opts.cards / opts.playerNames.length
    ? {rounds: 'Insufficient cards for that much rounds'}
    : {}
}

function validateStartingRound(opts) {
  return opts.startingRound > opts.rounds
    ? {startingRound: 'Impossible to start beyond the end of the game'}
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
export function entryOptionsValidator(opts) {
  const typeRes = validateType(opts)
  if (!isOk(typeRes)) {
    return typeRes
  } else {
    return {
      ...validateCards(opts),
      ...validateRounds(opts),
      ...validateStartingRound(opts)
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
export function isInteger(str) {
  const regex = /^[1-9]\d*$/
  return str === '' || regex.test(str)
}
