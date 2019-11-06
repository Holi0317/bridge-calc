import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { skipAction } from "../../actions/skip";
import { initSettingsAction } from "../actions/init-settings";
import { showToastAction } from "../../../toast-singleton/actions/show-toast";
import { remainingRoundsSelector } from "../../selectors/remaining-rounds";
import { currentRoundSelector } from "../../selectors/current-round";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import classes from "../settings.pcss";
import { useAction } from "../../../hooks/use-action";
import { useCallback } from "react";
import { currentGameSelector } from "../../selectors/current-game";

export function SkipRounds() {
  const { t } = useTranslation();

  const currentGame = useSelector(currentGameSelector);
  const currentRound = useSelector(currentRoundSelector);
  const remainingRounds = useSelector(remainingRoundsSelector);

  const skipAct = useAction(skipAction);
  const init = useAction(initSettingsAction);
  const showToast = useAction(showToastAction);

  const skip = useCallback(
    (n: number) => {
      if (n <= 0) {
        showToast(t("Already at the last round. Cannot skip."));
        return;
      }

      const isEndGame = remainingRounds <= n;
      skipAct(n);

      if (!isEndGame) {
        window.setTimeout(() => {
          init(currentGame);

          if (currentRound !== null) {
            const msg = t(
              "Skipped round(s). You are now playing round {{round}}",
              { round: currentRound }
            );
            showToast(msg);
          }
        }, 0);
      }
    },
    [skipAct, remainingRounds, showToast, t]
  );

  return (
    <ExpansionPanelDetails>
      <Button
        variant="outlined"
        className={classes.skipRoundsBtn}
        onClick={() => skip(1)}
      >
        {t("Skip this round")}
      </Button>
      <Button
        variant="outlined"
        className={classes.skipRoundsBtn}
        disabled={remainingRounds <= 1}
        onClick={() => skip(remainingRounds - 1)}
      >
        {t("Skip to last round")}
      </Button>
      <Button
        variant="outlined"
        className={classes.skipRoundsBtn}
        onClick={() => skip(remainingRounds)}
      >
        {t("End game")}
      </Button>
    </ExpansionPanelDetails>
  );
}
