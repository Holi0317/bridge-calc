import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, ExpansionPanelDetails } from "@material-ui/core";
import styled from "styled-components";
import { skipAction } from "../../actions/skip";
import { showToastAction } from "../../../toast-singleton/actions/show-toast";
import { remainingRoundsSelector } from "../../selectors/remaining-rounds";
import { currentRoundSelector } from "../../selectors/current-round";
import { useAction } from "../../../hooks/use-action";

const SkipRoundsBtn = styled(Button)`
  margin-right: 1em !important;

  &:last-child {
    margin-right: 0 !important;
  }
`;

export function SkipRounds() {
  const { t } = useTranslation();

  const currentRound = useSelector(currentRoundSelector);
  const remainingRounds = useSelector(remainingRoundsSelector);

  const skipAct = useAction(skipAction);
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
        if (currentRound !== null) {
          const msg = t(
            "Skipped round(s). You are now playing round {{round}}",
            { round: currentRound + n }
          );
          showToast(msg);
        }
      }
    },
    [remainingRounds, skipAct, showToast, t, currentRound]
  );

  return (
    <ExpansionPanelDetails>
      <SkipRoundsBtn variant="outlined" onClick={() => skip(1)}>
        {t("Skip this round")}
      </SkipRoundsBtn>
      <SkipRoundsBtn
        variant="outlined"
        disabled={remainingRounds <= 1}
        onClick={() => skip(remainingRounds - 1)}
      >
        {t("Skip to last round")}
      </SkipRoundsBtn>
      <SkipRoundsBtn variant="outlined" onClick={() => skip(remainingRounds)}>
        {t("End game")}
      </SkipRoundsBtn>
    </ExpansionPanelDetails>
  );
}
