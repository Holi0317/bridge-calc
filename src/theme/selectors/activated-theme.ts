import {createSelector} from 'reselect'
import {defaultTheme, themes} from '../color-presets'
import {IThemeState} from '../theme-reducer'
import {ITheme} from '../types'
import {IRootState} from '../../types'

/**
 * Return theme according to current selection from redux state.
 * Second parameter: Illuminance level from light sensor.
 * If the light level is lower than threshold and auto dark theme is enabled,
 * dark theme would be returned.
 * If light sensor is not available, pass in null for second parameter.
 */
export const activatedThemeSelector = createSelector(
  (state: IRootState) => state.theme,
  (_: IRootState, illuminance: number | null) => illuminance,
  (theme: IThemeState, illuminance: number | null): ITheme => {
    const useDark = theme.autoDarkTheme && illuminance && illuminance < theme.darkThreshold
    if (useDark) {
      return themes.get('dark') || defaultTheme
    }

    return themes.get(theme.theme) || defaultTheme
  }
)
