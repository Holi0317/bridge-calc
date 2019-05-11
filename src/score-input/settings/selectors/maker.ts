import { IRootState } from "../../../types";

/**
 * Select maker from settings state.
 */
export const makerSelector = (state: IRootState): string | null =>
  state.gameSettings.maker;
