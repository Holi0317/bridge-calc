import { RootState } from "../../../types";

/**
 * Select maker from settings state.
 */
export const makerSelector = (state: RootState): string | null =>
  state.gameSettings.maker;
