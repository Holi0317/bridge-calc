import { GameStage } from "../game-stage";
import { RootState } from "../../types";

/**
 * Select currentPlayerOrder property from current game state.
 * If it does not exist, empty array will be returned.
 */
export function playerOrderSelector(state: RootState): string[] {
  const currentGame = state.currentGame;
  if (!currentGame || currentGame.stage === GameStage.ended) {
    return [];
  }
  return currentGame.currentPlayerOrder;
}
