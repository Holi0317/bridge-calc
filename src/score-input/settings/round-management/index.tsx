import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ExpandMore } from "@material-ui/icons";
import { PanelHeading, PanelSubheading } from "../styled";
import { expandedPanelSelector } from "../selectors/expanded-panel";
import { toggleExpandAction } from "../actions/toggle-expand";
import { PANEL } from "../panel";
import { SkipRounds } from "./skip-rounds";
import { useAction } from "../../../hooks/use-action";

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography
} from "@material-ui/core";

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
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <PanelHeading>
          <Typography>{t("Skip rounds")}</Typography>
        </PanelHeading>
        <PanelSubheading>
          <Typography color="textSecondary">
            {t("Jump to other rounds")}
          </Typography>
        </PanelSubheading>
      </ExpansionPanelSummary>

      <SkipRounds />
    </ExpansionPanel>
  );
}
