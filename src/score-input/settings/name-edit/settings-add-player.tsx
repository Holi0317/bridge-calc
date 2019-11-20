import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import ContentAdd from "@material-ui/icons/Add";
import { addRandomNameAction } from "../actions/add-name";
import { Dispatch, RootState } from "../../../types";
import { settingsValidator } from "../settings-validator";
import { trans } from "../../../utils";

import { IconButton, Tooltip, Typography } from "@material-ui/core";

const mapStateToProps = (state: RootState) => ({
  error: settingsValidator(state).misc
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      addPlayer: addRandomNameAction
    },
    dispatch
  );

type stateType = ReturnType<typeof mapStateToProps>;
type dispatchType = ReturnType<typeof mapDispatchToProps>;

type SettingsAddPlayerProps = stateType & dispatchType;

export function SettingsAddPlayerImpl({
  error,
  addPlayer
}: SettingsAddPlayerProps) {
  const { t } = useTranslation();

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

export const SettingsAddPlayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsAddPlayerImpl);
