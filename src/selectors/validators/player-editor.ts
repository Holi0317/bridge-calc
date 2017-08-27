import {createSelector} from 'reselect'
import {namesSelector} from '../ui/settings/names'
import {playerEditorValidator, IPlayerEditorError} from '../../validators/player-editor'
import {IPlayerMap, IRootState, I18nT} from '../../types'

/**
 * Select validation result from player editor validator using state.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const playerEditorValidatorSelector = createSelector(
  namesSelector,
  (state: IRootState, t: I18nT) => t,
  (names: IPlayerMap<string>, t) => (
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
  (error: IPlayerEditorError) => (
    error.misc === '' && (Object.keys(error.names).length === 0)
  )
)
