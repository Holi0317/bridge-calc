import {IRootState} from '../../types'

/**
 * Select selected theme by user.
 */
export function selectedThemeSelector(state: IRootState): string {
  return state.theme.theme
}
