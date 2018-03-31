import {IRootState} from '../../types'

/**
 * Select selected theme ID (or name) by user.
 */
export function selectedThemeSelector(state: IRootState): string {
  return state.theme.theme
}
