import { RootState } from "../../types";

/**
 * Selects rounds property from current game.
 * If the property does not exists, null will be returned
 */
export const roundsSelector = (state: RootState): number | null =>
  state.currentGame ? state.currentGame.rounds : null;
