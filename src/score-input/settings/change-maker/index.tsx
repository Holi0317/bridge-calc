import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { changeMakerDisabledSelector } from "../selectors/change-maker-disabled";
import { expandedPanelSelector } from "../selectors/expanded-panel";
import { toggleExpandAction } from "../actions/toggle-expand";
import { PANEL } from "../panel";
import { MakerEditor } from "./maker-editor";
import { useAction } from "../../../hooks/use-action";
import { PanelHeading, PanelSubheading } from "../styled";

export function ChangeMaker() {
  const { t } = useTranslation();

  const disabled = useSelector(changeMakerDisabledSelector);
  const expandedPanel = useSelector(expandedPanelSelector);
  const expanded = expandedPanel === PANEL.CHANGE_MAKER;

  const toggleExpand = useAction(toggleExpandAction);

  const subHeading = disabled
    ? t("Maker edit is disabled when editing player names")
    : t("Change maker of current round");

  return (
    <ExpansionPanel
      expanded={expanded && !disabled}
      disabled={disabled}
      onChange={() => toggleExpand(PANEL.CHANGE_MAKER)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <PanelHeading>
          <Typography>{t("Change maker")}</Typography>
        </PanelHeading>
        <PanelSubheading>
          <Typography color="textSecondary">{subHeading}</Typography>
        </PanelSubheading>
      </ExpansionPanelSummary>

      <MakerEditor />
    </ExpansionPanel>
  );
}
