// @flow
import {isOk, removeUndef, toPairs} from '../utils'
import mapValues from 'lodash/mapValues'
import sumBy from 'lodash/sumBy'

import type {T, PlayerMap} from '../types'

export type StackInput = {
  bid?: PlayerMap<number>,
  win?: PlayerMap<number>,
  currentRound: number,
  lastPlayerID: string
}

type StackInputError = {
  bid?: PlayerMap<string>,
  win?: PlayerMap<string>
}

const validateKeys = ['bid', 'win']

function validateType(opts: StackInput, t: T): StackInputError {
  const propNames = {
    bid: 'Bid',
    win: 'Win'
  }

  const res: StackInputError = {}
  for (const key of validateKeys) {
    const value = opts[key]
    if (value) {
      const typeRes = _typeValidator(value, t, opts.currentRound, propNames[key])
      if (!isOk(typeRes)) {
        res[key] = typeRes
      }
    }
  }
  return res
}

/**
 * Validate type of player map.
 * @private
 */
function _typeValidator(obj: PlayerMap<number>, t: T, currentRound: number, property: string): PlayerMap<string> {
  const res = {}
  for (const [playerID, value] of toPairs(obj)) {
    if (!Number.isInteger(value) || value < 0) {
      res[playerID] = t('{{property}} must be an integer', {property})
    } else if (value > currentRound) {
      res[playerID] = t('Way too many cards')
    }
  }
  return res
}

function validateBid(opts: StackInput, t: T): PlayerMap<string> | null {
  if (!opts.bid) {
    return null
  }
  const sum: number = sumBy(toPairs(opts.bid), ([, value]) => value)
  return sum === opts.currentRound
    ? {[opts.lastPlayerID]: t('Cannot choose that')}
    : null
}

function validateWin(opts: StackInput, t: T): PlayerMap<string> | null {
  if (!opts.win || /* Is empty? */isOk(opts.win)) {
    return null
  }
  const sum: number = sumBy(toPairs(opts.win), ([, value]) => value)
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
export function stackInputValidator(opts: StackInput, t: T): StackInputError {
  const typeRes = validateType(opts, t)
  if (!isOk(typeRes)) {
    return typeRes
  } else {
    const res = {
      bid: validateBid(opts, t),
      win: validateWin(opts, t)
    }
    return removeUndef(res)
  }
}
