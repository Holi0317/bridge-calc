import React from "react";
import { Redirect, Route } from "react-router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { GameStage } from "./game-stage";
import { stageSelector } from "./selectors/stage";
import { showToastAction } from "../toast-singleton/actions/show-toast";
import { useAction } from "../hooks/use-action";
import { useCallback, useEffect } from "react";

interface ProtectedViewProps {
  comp: React.ComponentType<{}>;
}

export function ProtectedView({ comp: Comp }: ProtectedViewProps) {
  const { t } = useTranslation();

  const stage = useSelector(stageSelector);
  const ended = stage === GameStage.ended;

  const showToast = useAction(showToastAction);

  const attemptShowToast = useCallback(() => {
    if (ended) {
      showToast(t("Game has ended"));
    }
  }, [ended, showToast, t]);

  useEffect(attemptShowToast);

  return (
    <Route
      render={() => {
        if (ended) {
          return <Redirect to="/score-input/scoreboard" />;
        }
        return <Comp />;
      }}
    />
  );
}
