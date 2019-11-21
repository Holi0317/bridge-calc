import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Dropdown } from "../material/dropdown";
import {
  setRoundsAction,
  setStartingRoundAction
} from "./actions/set-entry-props";
import { optionsSourcesSelector } from "./selectors/options-sources";
import { RootState } from "../types";
import { useAction } from "../hooks/use-action";

const OptionsRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionsDropdown = styled(Dropdown)`
  width: 100% !important;
`;

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
    <OptionsRoot>
      <OptionsDropdown
        label={t("Number of rounds")}
        value={rounds}
        source={sources.rounds}
        onChange={setRounds}
      />

      <OptionsDropdown
        label={t("Starting round")}
        value={startingRound}
        source={sources.startingRound}
        onChange={setStartingRound}
      />
    </OptionsRoot>
  );
}
