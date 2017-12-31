import {IRootState} from '../../../types'

export function isMakerCleanSelector(state: IRootState): boolean {
  return !state.gameSettings.makerDirty
}
