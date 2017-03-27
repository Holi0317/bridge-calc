import {IBaseValidateResult, isOk} from './validate-util'

export interface IEntryOptionsValidatorOptions {
  cards: string
  rounds: string
  startingRound: string
  playerLength: number
}

export interface IEntryOptionsError {
  cards: string
  rounds: string
  startingRound: string
}

export interface IEntryOptionsValidationResult extends IBaseValidateResult {
  err: IEntryOptionsError
}

/**
 * Is given number a positive integer?
 * @param d
 * @returns {boolean}
 */
function isInteger(d: number) {
  return d > 0 && Number.isInteger(d)
}

function validateCards(opts: IEntryOptionsValidatorOptions) {
  if (!isInteger(+opts.cards)) {
    return 'Card must be a positive integer'
  }
  if (+opts.playerLength > +opts.cards) {
    return 'Too few cards'
  }
  return ''
}

function validateRounds(opts: IEntryOptionsValidatorOptions) {
  if (!isInteger(+opts.rounds)) {
    return 'Rounds must be a positive integer'
  }
  if (+opts.rounds > +opts.cards / opts.playerLength) {
    return 'Insufficient cards for that much rounds'
  }
  return ''
}

function validateStartingRound(opts: IEntryOptionsValidatorOptions) {
  if (!isInteger(+opts.startingRound)) {
    return 'Starting round must be a positive integer'
  }
  if (+opts.startingRound > +opts.rounds) {
    return 'Impossible to start beyond the end of the game'
  }
  return ''
}

export function entryOptionsValidator(opts: IEntryOptionsValidatorOptions): IEntryOptionsValidationResult {
  const err = {
    cards: validateCards(opts),
    rounds: validateRounds(opts),
    startingRound: validateStartingRound(opts)
  }
  return {
    err,
    ok: isOk(err)
  }
}
