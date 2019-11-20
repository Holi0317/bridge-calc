import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import ContentAdd from "@material-ui/icons/Add";
import { addRandomNameAction } from "../actions/add-name";
import { settingsValidator } from "../settings-validator";
import { trans } from "../../../utils";
import { useAction } from "../../../hooks/use-action";

export function SettingsAddPlayer() {
  const { t } = useTranslation();

  const settingsErrors = useSelector(settingsValidator);
  const error = settingsErrors.misc;

  const addPlayer = useAction(addRandomNameAction);

  return (
    <div>
      <Tooltip title={t("Add player")}>
        <IconButton onClick={addPlayer}>
          <ContentAdd width="28px" height="28px" />
        </IconButton>
      </Tooltip>

      {error != null && (
        <Typography color="error">{trans(t, error)}</Typography>
      )}
    </div>
  );
}
