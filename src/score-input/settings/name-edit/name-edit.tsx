import * as React from 'react'
import {translate} from 'react-i18next'
import {SettingsPlayerList} from './settings-player-list'
import {SettingsAddPlayer} from './settings-add-player'
import {ActionButtons} from './action-buttons'
import {ITranslateMixin} from '../../../types'
import {MutateNameDialog} from './mutate-name-dialog'
import Snackbar from 'material-ui/Snackbar'

interface INameEditState {
  dialogOpen: boolean
  toastOpen: boolean
  toastMsg: string
}

export class NameEditImpl extends React.Component {
  public props: ITranslateMixin
  public state: INameEditState = {
    dialogOpen: false,
    toastOpen: false,
    toastMsg: ''
  }

  public render() {
    const {t} = this.props
    const {dialogOpen, toastOpen, toastMsg} = this.state

    return (
      <div>
        <h4>{t('Edit players')}</h4>
        <SettingsPlayerList />
        <SettingsAddPlayer />
        <ActionButtons requestDialog={this.openDialog} />

        <MutateNameDialog open={dialogOpen} requestToast={this.openToast} onRequestClose={this.closeDialog} />
        <Snackbar
          open={toastOpen}
          message={toastMsg}
          autoHideDuration={3000}
          onRequestClose={this.closeToast}
        />
      </div>
    )
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

  private openToast = (msg: string) => {
    this.setState(() => ({
      toastOpen: true,
      toastMsg: msg
    }))
  }

  private closeToast = () => {
    this.setState(() => ({
      toastOpen: false
    }))
  }
}

export const NameEdit = translate()(NameEditImpl)
