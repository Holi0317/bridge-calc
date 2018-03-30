import {IRootState} from '../../types'

/**
 * Select current illuminance detected from redux store.
 *
 * If return value is null, light sensor is not available then.
 */
export function illuminanceSelector(state: IRootState): number | null {
  return state.theme.currentIlluminance
}
