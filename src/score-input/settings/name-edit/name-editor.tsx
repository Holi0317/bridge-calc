import * as React from 'react'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import {SettingsPlayerList} from './settings-player-list'
import {SettingsAddPlayer} from './settings-add-player'
import {ActionButtons} from './action-buttons'
import {MutateNameDialog} from './mutate-name-dialog'

interface INameEditState {
  dialogOpen: boolean
}

export class NameEditor extends React.Component {
  public state: INameEditState = {
    dialogOpen: false
  }

  public render() {
    const {dialogOpen} = this.state

    return <>
      <ExpansionPanelDetails>
        <SettingsPlayerList />
      </ExpansionPanelDetails>

      <ExpansionPanelDetails>
        <SettingsAddPlayer />
      </ExpansionPanelDetails>

      <ExpansionPanelActions>
        <ActionButtons requestDialog={this.openDialog} />
      </ExpansionPanelActions>

      <MutateNameDialog open={dialogOpen} onRequestClose={this.closeDialog} />
    </>

  }

  private openDialog = () => {
    this.setState(() => ({
      dialogOpen: true
    }))
  }

  private closeDialog = () => {
    this.setState(() => ({
      dialogOpen: false
    }))
  }
}
