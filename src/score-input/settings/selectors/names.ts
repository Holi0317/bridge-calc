import { IPlayerMap, IRootState } from "../../../types";

/**
 * Select names property from settings state
 */
export const namesSelector = (state: IRootState): IPlayerMap<string> =>
  state.gameSettings.names;
