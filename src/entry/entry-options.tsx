import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Dropdown } from "../material/dropdown";
import {
  setRoundsAction,
  setStartingRoundAction
} from "./actions/set-entry-props";
import { optionsSourcesSelector } from "./selectors/options-sources";
import { RootState } from "../types";
import classes from "./entry.pcss";
import { useAction } from "../hooks/use-action";

export function EntryOptions() {
  const { t } = useTranslation();

  const sources = useSelector(optionsSourcesSelector);
  const rounds = useSelector((state: RootState) => state.entry.rounds);
  const startingRound = useSelector(
    (state: RootState) => state.entry.startingRound
  );

  const setRounds = useAction(setRoundsAction);
  const setStartingRound = useAction(setStartingRoundAction);

  return (
    <div className={classes.optionsRootContainer}>
      <Dropdown
        label={t("Number of rounds")}
        className={classes.optionsDropdown}
        value={rounds}
        source={sources.rounds}
        onChange={setRounds}
      />

      <Dropdown
        label={t("Starting round")}
        className={classes.optionsDropdown}
        value={startingRound}
        source={sources.startingRound}
        onChange={setStartingRound}
      />
    </div>
  );
}
