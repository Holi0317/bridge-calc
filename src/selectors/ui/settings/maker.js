// @flow
import type {RootState} from '../../../types'

/**
 * Select maker from settings state.
 */
export const makerSelector = (state: RootState): ?string =>
  state.ui.settings.maker
