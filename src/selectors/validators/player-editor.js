// @flow
import {createSelector} from 'reselect'
import {namesSelector} from '../ui/settings/names'
import {playerEditorValidator} from '../../validators/player-editor'

import type {PlayerMap, RootState, T} from '../../types'

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
