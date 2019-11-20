import React from "react";
import { useTranslation } from "react-i18next";
import { replaceCurrentGameAction } from "../score-input/actions/replace-current-game";
import { resetGamesAtion } from "../prev-games/actions/reset-games";
import { showToastAction } from "../toast-singleton/actions/show-toast";
import { useCallback } from "react";
import { useAction } from "../hooks/use-action";
import { Button } from "@material-ui/core";

export function PurgeData() {
  const { t } = useTranslation();

  const showToast = useAction(showToastAction);
  const setCurrentGame = useAction(replaceCurrentGameAction);
  const resetPrevGame = useAction(resetGamesAtion);

  const clear = useCallback(() => {
    setCurrentGame(null);
    resetPrevGame();
    showToast(t("All data is cleared"));
  }, [t, showToast, setCurrentGame, resetPrevGame]);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={clear}>
        {t("Clear all data")}
      </Button>
    </div>
  );
}
