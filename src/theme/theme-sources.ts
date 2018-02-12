import {themes} from './color-presets'
import {IDropdownSource} from '../types'

export const themeSources: Array<IDropdownSource<string>> = Array.from(themes.keys())
  .map(theme => ({
    value: theme,
    label: theme
  }))
