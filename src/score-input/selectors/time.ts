import { GameStage } from "../game-stage";
import { RootState } from "../../types";

/**
 * Select starting time of current game.
 * If that is not defined, null will be selected.
 */
export const startTimeSelector = (state: RootState): Date | null =>
  state.currentGame ? new Date(state.currentGame.startTime) : null;

/**
 * Select ending time of current game.
 * If that is not defined, null will be selected.
 */
export const endTimeSelector = (state: RootState): Date | null =>
  state.currentGame && state.currentGame.stage === GameStage.ended
    ? new Date(state.currentGame.endTime)
    : null;
