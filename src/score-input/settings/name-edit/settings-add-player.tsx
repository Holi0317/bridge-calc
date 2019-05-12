import * as React from "react";
import flowRight from "lodash-es/flowRight";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { WithTranslation, withTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ContentAdd from "@material-ui/icons/Add";
import { addRandomNameAction } from "../actions/add-name";
import { Dispatch, IRootState } from "../../../types";
import { settingsValidator } from "../settings-validator";
import Typography from "@material-ui/core/Typography";

const mapStateToProps = (state: IRootState, { t }: WithTranslation) => ({
  error: settingsValidator(state, t).misc
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

type SettingsAddPlayerProps = stateType & dispatchType & WithTranslation;

export function SettingsAddPlayerImpl({
  error,
  addPlayer,
  t
}: SettingsAddPlayerProps) {
  return (
    <div>
      <Tooltip title={t("Add player")}>
        <IconButton onClick={addPlayer}>
          <ContentAdd width="28px" height="28px" />
        </IconButton>
      </Tooltip>

      <Typography color="error">{error}</Typography>
    </div>
  );
}

export const SettingsAddPlayer = flowRight(
  withTranslation(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SettingsAddPlayerImpl);
