import React from "react";
import { bindActionCreators } from "redux";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { toggleExpandAction } from "../actions/toggle-expand";
import { nameEditDisabledSelector } from "../selectors/name-edit-disabled";
import { expandedPanelSelector } from "../selectors/expanded-panel";
import { PANEL } from "../panel";
import { NameEditor } from "./name-editor";
import { Dispatch, RootState } from "../../../types";
import { PanelHeading, PanelSubheading } from "../styled";

const mapStateToProps = (state: RootState) => ({
  disabled: nameEditDisabledSelector(state),
  expanded: expandedPanelSelector(state) === PANEL.NAME_EDIT
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

type NameEditProps = stateType & dispatchType;

export function NameEditImpl({
  expanded,
  disabled,
  toggleExpand
}: NameEditProps) {
  const { t } = useTranslation();

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

export const NameEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(NameEditImpl);
