// @flow
import mapValues from 'lodash/mapValues'
import values from 'lodash/values'
import {dupe, isOk, removeUndef} from '../utils'

import type {PlayerMap, T} from '../types'

export type PlayerEditorOpts = {
  names: PlayerMap<string>
}

/**
 * Error found in validation process.
 */
export type PlayerEditorError = {
  /**
   * Error of each name given.
   * If this property is not defined, no error exist in player names.
   */
  names?: PlayerMap<string>,
  /**
   * Error found in player names but could not be displayed on a specific player.
   * If this property is not defined, no such error exist.
   * Only too few player error will use this property.
   */
  misc?: string
}

function namesValid(opts: PlayerEditorOpts, t: T): ?PlayerMap<string> {
  const names = opts.names
  const dupedNames = dupe(values(names))
  const validatedNames = mapValues(names, (name: ?string) => {
    if (name == null || name === '') {
      return t('Name cannot be empty')
    }
    if (dupedNames.includes(name)) {
      return t('Name cannot be repeated')
    }
    return ''
  })
  const purged = removeUndef(validatedNames)
  return isOk(purged) ? null : purged
}

function miscValid(opts: PlayerEditorOpts, t: T): ?string {
  return Object.keys(opts.names).length < 2 ? t('At least 2 players is required for a game') : null
}

/**
 * Validate player editor parameters.
 * If arguments are valid, empty object will be returned.
 * Otherwise, an object that maps field -> error message will be returned.
 * Use utils.isOk to check for error.
 */
export function playerEditorValidator(opts: PlayerEditorOpts, t: T): PlayerEditorError {
  const res = {
    names: namesValid(opts, t),
    misc: miscValid(opts, t)
  }
  return removeUndef(res)
}
