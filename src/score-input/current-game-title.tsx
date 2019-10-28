import * as React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { gameTitleSelector } from "./selectors/game-title";
import { RootState } from "../types";
import { trans } from "../utils";

const mapStateToProps = (state: RootState) => ({
  title: gameTitleSelector(state)
});

type stateType = ReturnType<typeof mapStateToProps>;

type CurrentGameTitleProps = stateType;

export function CurrentGameTitleImpl({ title }: CurrentGameTitleProps) {
  const { t } = useTranslation();

  return <span>{trans(t, title)}</span>;
}

export const CurrentGameTitle = connect(mapStateToProps)(CurrentGameTitleImpl);
