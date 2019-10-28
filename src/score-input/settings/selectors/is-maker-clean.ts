import { RootState } from "../../../types";

export function isMakerCleanSelector(state: RootState): boolean {
  return !state.gameSettings.makerDirty;
}
