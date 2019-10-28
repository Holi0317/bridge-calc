import * as React from "react";
import { bindActionCreators } from "redux";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { expandedPanelSelector } from "../selectors/expanded-panel";
import { toggleExpandAction } from "../actions/toggle-expand";
import { PANEL } from "../panel";
import { SkipRounds } from "./skip-rounds";
import { RootState, Dispatch } from "../../../types";
import classes from "../settings.pcss";

const mapStateToProps = (state: RootState) => ({
  expanded: expandedPanelSelector(state) === PANEL.ROUND_MANAGEMENT
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      toggleExpand: toggleExpandAction
    },
    dispatch
  );

type stateType = ReturnType<typeof mapStateToProps>;
type dispatchType = ReturnType<typeof mapDispatchToProps>;

type RoundManagementProps = stateType & dispatchType;

export function RoundManagementImpl({
  expanded,
  toggleExpand
}: RoundManagementProps) {
  const { t } = useTranslation();

  return (
    <ExpansionPanel
      expanded={expanded}
      onChange={() => toggleExpand(PANEL.ROUND_MANAGEMENT)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.panelHeading}>
          <Typography className={classes.heading}>
            {t("Skip rounds")}
          </Typography>
        </div>
        <div className={classes.panelSubheading}>
          <Typography
            className={classes.secondaryHeading}
            color="textSecondary"
          >
            {t("Jump to other rounds")}
          </Typography>
        </div>
      </ExpansionPanelSummary>

      <SkipRounds />
    </ExpansionPanel>
  );
}

export const RoundManagement = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoundManagementImpl);
