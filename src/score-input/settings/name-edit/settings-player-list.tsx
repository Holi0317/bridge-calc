import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { NameInputList } from "../../../name-input-list";
import { nameInputListSourceSelector } from "../selectors/name-input-list-source";
import { setNamesFromEntries } from "../actions/set-names";
import { settingsValidator } from "../settings-validator";
import { trans } from "../../../utils";
import { useAction } from "../../../hooks/use-action";

export function SettingsPlayerList() {
  const { t } = useTranslation();

  const names = useSelector(nameInputListSourceSelector);
  const settingError = useSelector(settingsValidator);
  const errors = settingError.names;

  const changeNames = useAction(setNamesFromEntries);

  const values = names.map(([id, value]) => {
    const error = errors[id];

    return {
      value,
      id,
      error: error == null ? null : trans(t, error)
    };
  });

  return <NameInputList values={values} onChange={changeNames} />;
}
