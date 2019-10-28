import { RootState } from "../../../types";
import { PANEL } from "../panel";

export function expandedPanelSelector(state: RootState): PANEL | null {
  return state.gameSettings.expandedPanel;
}
