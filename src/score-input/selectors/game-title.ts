import { createSelector } from "reselect";
import i18next from "i18next";
import { stageSelector } from "./stage";
import { currentRoundSelector } from "./current-round";
import { roundsSelector } from "./rounds";
import { GameStage } from "../game-stage";
import { IRootState } from "../../types";

/**
 * Compute title to be displayed on app bar for current game.
 * Additional argument: i18next T object must be passed in as second argument.
 */
export const gameTitleSelector = createSelector(
  stageSelector,
  currentRoundSelector,
  roundsSelector,
  (_: IRootState, t: i18next.TFunction) => t,
  (
    stage: GameStage | null,
    currentRound: number | null,
    rounds: number | null,
    t: i18next.TFunction
  ): string => {
    if (stage == null) {
      return "";
    } else if (
      stage === GameStage.waitingBid ||
      stage === GameStage.waitingWin
    ) {
      return t("Round {{currentRound}} of {{rounds}}", {
        currentRound,
        rounds
      });
    } else if (stage === GameStage.ended) {
      return t("Game over");
    } else {
      return "";
    }
  }
);
