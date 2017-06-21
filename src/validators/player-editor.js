// @flow
import mapValues from 'lodash/mapValues'
import values from 'lodash/values'
import {dupe, removeUndef} from '../utils'

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
   * If this is an empty object, no error exist in player names.
   */
  names: PlayerMap<string>,
  /**
   * Error found in player names but could not be displayed on a specific player.
   * If this is an empty string, no such error exist.
   * Only too few player error will use this property.
   */
  misc: string
}

function namesValid(opts: PlayerEditorOpts, t: T): PlayerMap<string> {
  const names = opts.names
  const dupedNames = dupe(values(names))
  const validatedNames = mapValues(names, (name: ?string) => (
    (name == null || name === '')
      ? t('Name cannot be empty')
      : (dupedNames.includes(name))
        ? t('Name cannot be repeated')
        : ''
  ))
  return removeUndef(validatedNames) // Remove no error players.
}

function miscValid(opts: PlayerEditorOpts, t: T): string {
  return Object.keys(opts.names).length < 2 ? t('At least 2 players is required for a game') : ''
}

/**
 * Validate player editor parameters.
 * An object that maps field -> error message will be returned.
 * _ATTENTION_: Unlike other validators, empty values will be preserved.
 * Look for error interface definition for no error case.
 */
export function playerEditorValidator(opts: PlayerEditorOpts, t: T): PlayerEditorError {
  return {
    names: namesValid(opts, t),
    misc: miscValid(opts, t)
  }
}
