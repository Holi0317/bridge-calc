import React from "react";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import { SettingsPlayerList } from "./settings-player-list";
import { SettingsAddPlayer } from "./settings-add-player";
import { ActionButtons } from "./action-buttons";
import { MutateNameDialog } from "./mutate-name-dialog";

export function NameEditor() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <ExpansionPanelDetails>
        <SettingsPlayerList />
      </ExpansionPanelDetails>

      <ExpansionPanelDetails>
        <SettingsAddPlayer />
      </ExpansionPanelDetails>

      <ExpansionPanelActions>
        <ActionButtons requestDialog={() => setDialogOpen(true)} />
      </ExpansionPanelActions>

      <MutateNameDialog
        open={dialogOpen}
        onRequestClose={() => setDialogOpen(false)}
      />
    </>
  );
}
