// @flow
import {createSelector} from 'reselect'
import {namesSelector} from '../ui/settings/names'
import {playerEditorValidator} from '../../validators/player-editor'

import type {PlayerMap, RootState, T} from '../../types'
import type {PlayerEditorError} from '../../validators/player-editor'

/**
 * Select validation result from player editor validator using state.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const playerEditorValidatorSelector = createSelector(
  namesSelector,
  (state: RootState, t: T) => t,
  (names: PlayerMap<string>, t) => (
    playerEditorValidator({names}, t)
  )
)

/**
 * Test if current player editor is valid.
 * If true, the player editor state is valid and has passed validation.
 * False otherwise.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const isValidPlayerEditor = createSelector(
  playerEditorValidatorSelector,
  (error: PlayerEditorError) => (
    error.misc === '' && (Object.keys(error.names).length === 0)
  )
)
