import {createSelector} from 'reselect'
import {TranslationFunction} from 'i18next'
import mapValues from 'lodash-es/mapValues'
import {namesSelector} from './selectors/names'
import {dupe, isOk, removeUndef} from '../../utils'
import {IPlayerMap, IRootState} from '../../types'
import {expectedRoundsSelector} from './selectors/expected-rounds'
import {currentRoundSelector} from '../selectors/current-round'

const playerUpperLimit = 52

export interface ISettingsError {
  names: IPlayerMap<string>
  misc: string | null
}

function validateNames(names: IPlayerMap<string>, t: TranslationFunction): IPlayerMap<string> {
  const duplicates = dupe(Object.values(names))
  const res: IPlayerMap<string | null> = mapValues(names, (name: string) => {
    if (name === '') {
      return t('Name cannot be empty')
    }
    if (duplicates.includes(name)) {
      return t('Name cannot be repeated')
    }
    return null
  })
  return removeUndef(res)
}

function validateMisc(names: IPlayerMap<string>, currentRound: number, expectedRounds: number, t: TranslationFunction): string | null {
  const size = Object.keys(names).length
  if (size < 2) {
    return t('At least 2 players is required for a game')
  }
  if (size > playerUpperLimit) {
    return t('Too many players. Upper limit is {{limit}} players.', {limit: playerUpperLimit})
  }
  if (expectedRounds < currentRound) {
    return t('Impossible to continue the game due to too many players')
  }
  return null
}

/**
 * Validate settings options.
 * If options are valid, an empty object will be returned.
 * Otherwise, an object with property -> error message will be returned.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const settingsValidator = createSelector(
  namesSelector,
  currentRoundSelector,
  expectedRoundsSelector,
  (_: IRootState, t: TranslationFunction) => t,
  (names: IPlayerMap<string>, currentRound: number, expectedRounds: number, t: TranslationFunction): ISettingsError => ({
    names: validateNames(names, t),
    misc: validateMisc(names, currentRound, expectedRounds, t)
  })
)

/**
 * Select validity of settings options.
 * If valid, the selected value will be true.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const isSettingsValid = createSelector(
  settingsValidator,
  (error: ISettingsError): boolean =>
    isOk(error.names) && error.misc === null
)
