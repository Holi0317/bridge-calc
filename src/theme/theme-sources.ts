import {themes} from './color-presets'
import {IDropdownSource} from '../material/dropdown'

/**
 * Available themes in dropdown source form.
 *
 * This array is computed according to color-presets.ts upon import.
 * Therefore dynamic theme is not supported.
 */
export const themeSources: Array<IDropdownSource<string>> = Array.from(themes.keys())
  .map(theme => ({
    value: theme,
    label: theme
  }))
