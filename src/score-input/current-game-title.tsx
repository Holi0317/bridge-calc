import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { gameTitleSelector } from "./selectors/game-title";
import { trans } from "../utils";

export function CurrentGameTitle() {
  const { t } = useTranslation();

  const title = useSelector(gameTitleSelector);

  return <span>{trans(t, title)}</span>;
}
