import { IRootState } from "../../types";

/**
 * Selects rounds property from current game.
 * If the property does not exists, null will be returned
 */
export const roundsSelector = (state: IRootState): number | null =>
  state.currentGame ? state.currentGame.rounds : null;
