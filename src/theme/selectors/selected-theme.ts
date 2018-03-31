import {IRootState} from '../../types'

/**
 * Select selected theme by use.
 * Note that activated theme is not always equal to selected theme.
 * The prior one depends on light level.
 */
export function selectedThemeSelector(state: IRootState): string {
  return state.theme.theme
}
