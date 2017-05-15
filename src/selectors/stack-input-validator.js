// @flow
import {createSelector} from 'reselect'
import {GameStage} from '../game-stage'
import {isOk, last} from '../utils'
import {stackInputValidator} from '../validators/stack-input'

import type {RootState, T} from '../types'
import type {GameState} from '../reducer/current-game'
import type {StackInputError} from '../validators/stack-input'

/**
 * Select validation result of entry options.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const stackInputValidatorSelector = createSelector(
  (state: RootState) => state.currentGame,
  (state: RootState, t: T) => t,
  (currentGame: GameState, t: T) => {
    if (!currentGame || currentGame.stage === GameStage.ended) {
      return {}
    }
    const lastPlayerID = last(currentGame.currentPlayerOrder)
    const opts = {
      bid: currentGame.bid,
      win: currentGame.stage === GameStage.waitingWin ? currentGame.win : {},
      currentRound: currentGame.currentRound,
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
