import { createSelector } from "reselect";
import { stageSelector } from "./stage";
import { currentRoundSelector } from "./current-round";
import { roundsSelector } from "./rounds";
import { GameStage } from "../game-stage";
import { ITranslateData, tData } from "../../utils";

/**
 * Compute title to be displayed on app bar for current game.
 */
export const gameTitleSelector = createSelector(
  stageSelector,
  currentRoundSelector,
  roundsSelector,
  (
    stage: GameStage | null,
    currentRound: number | null,
    rounds: number | null
  ): ITranslateData => {
    if (stage === GameStage.waitingBid || stage === GameStage.waitingWin) {
      return tData("Round {{currentRound}} of {{rounds}}", {
        currentRound,
        rounds
      });
    } else {
      // This include cases where `GameStage` is null and other unknown cases
      return tData("Game over");
    }
  }
);
