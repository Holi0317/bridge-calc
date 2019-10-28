import { GameStage } from "../game-stage";
import { RootState } from "../../types";

/**
 * Selects currentRound property from current game.
 * If the property does not exists, 0 will be returned
 */
export function currentRoundSelector(state: RootState): number {
  const currentGame = state.currentGame;
  if (currentGame && currentGame.stage !== GameStage.ended) {
    return currentGame.currentRound;
  }
  return 0;
}
