// @flow
import {createSelector} from 'reselect'
import {GameStage} from '../game-stage'
import {isOk} from '../utils'
import last from 'lodash/last'
import {stageSelector} from './stage'
import {playerOrderSelector} from './player-order'
import {bidSelector} from './bid'
import {winSelector} from './win'
import {currentRoundSelector} from './current-round'
import {stackInputValidator} from '../validators/stack-input'

import type {PlayerMap, RootState, T} from '../types'
import type {StackInputError} from '../validators/stack-input'

/**
 * Select validation result of entry options.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const stackInputValidatorSelector = createSelector(
  stageSelector,
  playerOrderSelector,
  bidSelector,
  winSelector,
  currentRoundSelector,
  (state: RootState, t: T) => t,
  (stage: ?string, playerOrder: string[], bid: PlayerMap<number>, win: PlayerMap<number>, currentRound: number, t: T) => {
    if (!stage || stage === GameStage.ended) {
      return {}
    }
    const lastPlayerID = last(playerOrder)
    const opts = {
      bid: bid,
      win: stage === GameStage.waitingWin ? win : {},
      currentRound: currentRound,
      lastPlayerID: lastPlayerID || ''
    }
    return stackInputValidator(opts, t)
  }
)

/**
 * Select if current stack input state is valid or not.
 * If true, the current state is valid. False if otherwise.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const validStackInput = createSelector(
  stackInputValidatorSelector,
  (error: StackInputError) => isOk(error)
)

/**
 * Same functionality as stackInputValidatorSelector.
 * Except the selected object must contain both bid and win properties.
 * If there is no error, the bid and win properties will be empty object.
 * This aims to suppress undefined error from JS when accessing error.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const withErrorProp = createSelector(
  stackInputValidatorSelector,
  (error: StackInputError) => ({
    bid: {},
    win: {},
    ...error
  })
)
