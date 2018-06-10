import {IRootState} from '../../../types'
import {PANEL} from '../panel'

export function expandedPanelSelector(state: IRootState): PANEL | null {
  return state.gameSettings.expandedPanel
}
