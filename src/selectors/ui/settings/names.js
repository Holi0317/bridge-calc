// @flow
import type {IPlayerMap, RootState} from '../../../types'

/**
 * Select names property from settings state
 */
export const namesSelector = (state: RootState): IPlayerMap<string> =>
  state.ui.settings.names
