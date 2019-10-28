import { RootState } from "../../../types";

/**
 * Select if name edit panel should be disabled or not
 */
export function nameEditDisabledSelector(state: RootState) {
  return state.gameSettings.makerDirty;
}
