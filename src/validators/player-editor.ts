import mapValues from 'lodash-es/mapValues'
import values from 'lodash-es/values'
import {dupe, removeUndef} from '../utils'

import {IPlayerMap, I18nT} from '../types'

export interface IPlayerEditorOpts {
  names: IPlayerMap<string>
}

/**
 * Error found in validation process.
 */
export interface IPlayerEditorError {
  /**
   * Error of each name given.
   * If this is an empty object, no error exist in player names.
   */
  names: IPlayerMap<string>,
  /**
   * Error found in player names but could not be displayed on a specific player.
   * If this is an empty string, no such error exist.
   * Only too few player error will use this property.
   */
  misc: string
}

function namesValid(opts: IPlayerEditorOpts, t: I18nT): IPlayerMap<string> {
  const names = opts.names
  const dupedNames = dupe(values(names))
  const validatedNames = mapValues(names, (name?: string) => (
    (name == null || name === '')
      ? t('Name cannot be empty')
      : (dupedNames.includes(name))
        ? t('Name cannot be repeated')
        : ''
  ))
  return removeUndef(validatedNames) // Remove no error players.
}

function miscValid(opts: IPlayerEditorOpts, t: I18nT): string {
  return Object.keys(opts.names).length < 2
    ? t('At least 2 players is required for a game')
    : ''
}

/**
 * Validate player editor parameters.
 * An object that maps field -> error message will be returned.
 * _ATTENTION_: Unlike other validators, empty values will be preserved.
 * Look for error interface definition for no error case.
 */
export function playerEditorValidator(opts: IPlayerEditorOpts, t: I18nT): IPlayerEditorError {
  return {
    misc: miscValid(opts, t),
    names: namesValid(opts, t)
  }
}
