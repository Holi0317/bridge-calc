import {IRootState} from '../../../types'

/**
 * Select if name edit panel should be disabled or not
 */
export function nameEditDisabledSelector(state: IRootState) {
  return state.gameSettings.makerDirty
}
