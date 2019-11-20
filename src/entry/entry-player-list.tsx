import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { NameInputList } from "../name-input-list";
import { entryOptionsValidator } from "./entry-validator";
import { setPlayerNamesAction } from "./actions/set-entry-props";
import { RootState } from "../types";
import { trans } from "../utils";
import { useAction } from "../hooks/use-action";

export function EntryPlayerList() {
  const { t } = useTranslation();

  const playerNames = useSelector(
    (state: RootState) => state.entry.playerNames
  );
  const errors = useSelector(entryOptionsValidator);
  const playerNamesError = errors.playerNames;

  const setPlayerNames = useAction(setPlayerNamesAction);

  const values = playerNames.map((name, index) => {
    const error = playerNamesError == null ? null : playerNamesError[index];

    return {
      value: name.value,
      error: error == null ? "" : trans(t, error),
      id: name.id
    };
  });

  return <NameInputList values={values} onChange={setPlayerNames} />;
}
