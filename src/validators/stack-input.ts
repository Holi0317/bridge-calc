import {isOk, removeUndef} from '../utils'
import mapValues from 'lodash-es/mapValues'
import sumBy from 'lodash-es/sumBy'

import {I18nT, IPlayerMap} from '../types'

export interface IStackInput {
  bid?: IPlayerMap<number>,
  win?: IPlayerMap<number>,
  currentRound: number,
  lastPlayerID: string
}

export interface IStackInputError {
  bid?: IPlayerMap<string>,
  win?: IPlayerMap<string>
}

function validateBid(opts: IStackInput, t: I18nT): IPlayerMap<string> | null {
  if (!opts.bid) {
    return null
  }
  const sum: number = sumBy(Object.entries(opts.bid), ([, value]) => value)
  return sum === opts.currentRound
    ? {[opts.lastPlayerID]: t('Cannot choose that')}
    : null
}

function validateWin(opts: IStackInput, t: I18nT): IPlayerMap<string> | null {
  if (!opts.win || /* Is empty? */isOk(opts.win)) {
    return null
  }
  const sum: number = sumBy(Object.entries(opts.win), ([, value]) => value)
  if (sum === opts.currentRound) {
    return null
  }
  const msg = sum > opts.currentRound
    ? t('Too many stacks')
    : t('Too less stacks')
  return mapValues(opts.win, () => msg)
}

/**
 * Validate Stack Input.
 * If options are valid, an empty object will be returned.
 * Otherwise, an object with property -> Player ID -> error message will be returned.
 * Use utils.isOk to check if there is any error during validation process.
 * @param opts - Stack input to be validated
 * @param opts.bid - A map maps player ID to bid selection
 * @param opts.win - A map maps player ID to win selection
 * @param opts.currentRound - Current round number. Implies number of cards each player is holding
 * @param opts.lastPlayerID - The ID of last player. I.E. the player before marker
 * @param t - i18next translate function
 * @returns {Object} Error of each property
 */
export function stackInputValidator(opts: IStackInput, t: I18nT): IStackInputError {
  const res = {
    bid: validateBid(opts, t),
    win: validateWin(opts, t)
  }
  return removeUndef(res)
}
