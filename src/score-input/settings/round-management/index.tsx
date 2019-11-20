import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { expandedPanelSelector } from "../selectors/expanded-panel";
import { toggleExpandAction } from "../actions/toggle-expand";
import { PANEL } from "../panel";
import { SkipRounds } from "./skip-rounds";
import classes from "../settings.pcss";
import { useAction } from "../../../hooks/use-action";

export function RoundManagement() {
  const { t } = useTranslation();

  const expandedPanel = useSelector(expandedPanelSelector);
  const expanded = expandedPanel === PANEL.ROUND_MANAGEMENT;

  const toggleExpand = useAction(toggleExpandAction);

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
