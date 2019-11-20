import React from "react";
import { SettingsPlayerList } from "./settings-player-list";
import { SettingsAddPlayer } from "./settings-add-player";
import { ActionButtons } from "./action-buttons";
import { MutateNameDialog } from "./mutate-name-dialog";

import {
  ExpansionPanelDetails,
  ExpansionPanelActions
} from "@material-ui/core";

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
