import { RootState } from "../types";
import { GameStage } from "../score-input/game-stage";

export function showContinueSelector({ currentGame }: RootState): boolean {
  return !!(currentGame && currentGame.stage !== GameStage.ended);
}
