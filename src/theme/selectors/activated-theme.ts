import {createSelector} from 'reselect'
import {defaultTheme, themes} from '../color-presets'
import {IThemeState} from '../theme-reducer'
import {ITheme} from '../types'
import {illuminanceSelector} from './illuminance'
import {IRootState} from '../../types'

/**
 * Return theme according to current selection from redux state.
 * If the light level is lower than threshold and auto dark theme is enabled,
 * dark theme would be returned.
 */
export const activatedThemeSelector = createSelector(
  (state: IRootState) => state.theme,
  illuminanceSelector,
  (theme: IThemeState, illuminance: number | null): ITheme => {
    const useDark = theme.autoDarkTheme && illuminance && illuminance < theme.darkThreshold
    if (useDark) {
      return themes.get('dark') || defaultTheme
    }

    return themes.get(theme.theme) || defaultTheme
  }
)
