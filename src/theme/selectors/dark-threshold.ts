import {IRootState} from '../../types'

export function darkThresholdSelector(state: IRootState): number {
  return state.theme.darkThreshold
}
