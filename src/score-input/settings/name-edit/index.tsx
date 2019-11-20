import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { toggleExpandAction } from "../actions/toggle-expand";
import { nameEditDisabledSelector } from "../selectors/name-edit-disabled";
import { expandedPanelSelector } from "../selectors/expanded-panel";
import { PANEL } from "../panel";
import { NameEditor } from "./name-editor";
import { PanelHeading, PanelSubheading } from "../styled";
import { useAction } from "../../../hooks/use-action";

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography
} from "@material-ui/core";

export function NameEdit() {
  const { t } = useTranslation();

  const disabled = useSelector(nameEditDisabledSelector);
  const expandedPanel = useSelector(expandedPanelSelector);
  const expanded = expandedPanel === PANEL.NAME_EDIT;

  const toggleExpand = useAction(toggleExpandAction);

  const subHeading = disabled
    ? t("Player name edit is disabled when editing maker")
    : t("Add, remove or change names of players");

  return (
    <ExpansionPanel
      expanded={expanded && !disabled}
      disabled={disabled}
      onChange={() => toggleExpand(PANEL.NAME_EDIT)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <PanelHeading>
          <Typography>{t("Edit players")}</Typography>
        </PanelHeading>
        <PanelSubheading>
          <Typography color="textSecondary">{subHeading}</Typography>
        </PanelSubheading>
      </ExpansionPanelSummary>

      <NameEditor />
    </ExpansionPanel>
  );
}
