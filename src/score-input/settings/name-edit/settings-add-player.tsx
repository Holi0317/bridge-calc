import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ContentAdd from "@material-ui/icons/Add";
import { addRandomNameAction } from "../actions/add-name";
import { Dispatch, IRootState } from "../../../types";
import { settingsValidator } from "../settings-validator";
import Typography from "@material-ui/core/Typography";
import { trans2 } from "../../../utils";

const mapStateToProps = (state: IRootState) => ({
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
        <Typography color="error">{trans2(t, error)}</Typography>
      )}
    </div>
  );
}

export const SettingsAddPlayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsAddPlayerImpl);
