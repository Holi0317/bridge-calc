import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import { GameStage } from "../game-stage";
import { stageSelector } from "../selectors/stage";
import { isStackInputValid } from "./stack-input-validator";
import { bidAction } from "../actions/bid";
import { winAction } from "../actions/win";
import { undoAction } from "../actions/undo";
import classes from "./action-buttons.pcss";
import { currentGameSelector } from "../selectors/current-game";
import { useCallback } from "react";
import { useAction } from "../../hooks/use-action";

export function ActionButtons() {
  const { t } = useTranslation();

  const stage = useSelector(stageSelector);
  const inputValid = useSelector(isStackInputValid);
  const currentGame = useSelector(currentGameSelector);

  const bid = useAction(bidAction);
  const win = useAction(winAction);
  const undo = useAction(undoAction);
  // Material-ui needs handler to be undefined instead of null
  const undoHandler = currentGame == null ? undefined : undo;

  const undoDisabled = stage !== GameStage.waitingWin;
  const nextDisabled = !inputValid;

  const next = useCallback(() => {
    if (!currentGame) {
      // Just to eliminate state is null case
    } else if (currentGame.stage === GameStage.waitingBid) {
      bid(currentGame.bid);
    } else if (currentGame.stage === GameStage.waitingWin) {
      win(currentGame.win);
    }
  }, [currentGame, bid, win]);

  return (
    <div className={classes.btnContainer}>
      <Button
        variant="contained"
        color="primary"
        disabled={nextDisabled}
        onClick={next}
      >
        {t("Next")}
      </Button>
      <div className={classes.stretch} />
      <Button variant="contained" disabled={undoDisabled} onClick={undoHandler}>
        {t("Undo")}
      </Button>
    </div>
  );
}
