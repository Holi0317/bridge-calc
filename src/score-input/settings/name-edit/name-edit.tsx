import * as React from 'react'
import {translate} from 'react-i18next'
import {SettingsPlayerList} from './settings-player-list'
import {SettingsAddPlayer} from './settings-add-player'
import {ActionButtons} from './action-buttons'
import {ITranslateMixin} from '../../../types'
import {MutateNameDialog} from './mutate-name-dialog'

interface INameEditState {
  dialogOpen: boolean
  toastOpen: boolean
}

export class NameEditImpl extends React.Component {
  public props: ITranslateMixin
  public state: INameEditState = {
    dialogOpen: false,
    toastOpen: false
  }

  public render() {
    const {t} = this.props
    const {dialogOpen, toastOpen} = this.state

    return (
      <div>
        <h4>{t('Edit players')}</h4>
        <SettingsPlayerList />
        <SettingsAddPlayer />
        <ActionButtons requestDialog={this.openDialog} />

        <MutateNameDialog open={dialogOpen} onRequestClose={this.closeDialog} />
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

  private openToast = () => {
    this.setState(() => ({
      toastOpen: true
    }))
  }

  private closeToast = () => {
    this.setState(() => ({
      toastOpen: false
    }))
  }
}

export const NameEdit = translate()(NameEditImpl)
