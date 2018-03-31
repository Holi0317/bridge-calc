import {createSelector} from 'reselect'
import {illuminanceSelector} from './illuminance'
import {autoDarkSelector} from './auto-dark'
import {darkThresholdSelector} from './dark-threshold'

/**
 * Should dark theme be used according to current illuminance and preference.
 */
export const useDarkSelector = createSelector(
  illuminanceSelector,
  autoDarkSelector,
  darkThresholdSelector,
  (illuminance: number | null, autoDark: boolean, threshold: number): boolean =>
    !!(autoDark && illuminance && illuminance < threshold)
)
