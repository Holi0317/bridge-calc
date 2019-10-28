import { PlayerMap, RootState } from "../../../types";

/**
 * Select names property from settings state
 */
export const namesSelector = (state: RootState): PlayerMap<string> =>
  state.gameSettings.names;
