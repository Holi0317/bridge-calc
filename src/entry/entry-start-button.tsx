import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components/macro";
import { entryOptionsValidator, isEntryOptionsValid } from "./entry-validator";
import { startAction } from "../score-input/actions/start";
import { trans } from "../utils";
import { RootState } from "../types";
import { useAction } from "../hooks/use-action";

const BtnContainer = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export function EntryStartButton() {
  const { t } = useTranslation();
  const history = useHistory();

  const rounds = useSelector((state: RootState) => state.entry.rounds);
  const playerNames = useSelector(
    (state: RootState) => state.entry.playerNames
  );
  const startingRound = useSelector(
    (state: RootState) => state.entry.startingRound
  );
  const valid = useSelector(isEntryOptionsValid);
  const miscError = useSelector(entryOptionsValidator).misc;

  const startAct = useAction(startAction);

  const start = useCallback(() => {
    startAct(
      rounds,
      playerNames.map(entry => entry.value),
      startingRound
    );
    history.push("/score-input");
  }, [rounds, playerNames, startingRound, startAct, history]);

  return (
    <BtnContainer>
      <Button
        variant="contained"
        color="primary"
        disabled={!valid}
        onClick={start}
      >
        {t("Start")}
      </Button>
      {miscError != null && (
        <Typography color="error">{trans(t, miscError)}</Typography>
      )}
    </BtnContainer>
  );
}
