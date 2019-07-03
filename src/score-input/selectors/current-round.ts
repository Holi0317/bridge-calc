import { GameStage } from "../game-stage";
import { IRootState } from "../../types";

/**
 * Selects currentRound property from current game.
 * If the property does not exists, 0 will be returned
 */
export function currentRoundSelector(state: IRootState): number {
  const currentGame = state.currentGame;
  if (currentGame && currentGame.stage !== GameStage.ended) {
    return currentGame.currentRound;
  }
  return 0;
}
