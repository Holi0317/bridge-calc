import * as React from 'react'
import {translate} from 'react-i18next'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import {SettingsPlayerList} from './settings-player-list'
import {SettingsAddPlayer} from './settings-add-player'
import {ActionButtons} from './action-buttons'
import {ITranslateMixin} from '../../../types'
import {MutateNameDialog} from './mutate-name-dialog'
import style from '../settings.css'

interface INameEditState {
  dialogOpen: boolean
}

export class NameEditImpl extends React.Component {
  public props: ITranslateMixin
  public state: INameEditState = {
    dialogOpen: false
  }

  public render() {
    // FIXME The card should be expandable and CardHeader should expand the card
    const {t} = this.props
    const {dialogOpen} = this.state

    return <Card className={style.sessionCard}>
      {/* FIXME Regression: Card header title is too large */}
      <CardHeader title={t('Edit players')}/>
      <CardContent>
        <SettingsPlayerList />
        <SettingsAddPlayer />
        <ActionButtons requestDialog={this.openDialog} />

        <MutateNameDialog open={dialogOpen} onRequestClose={this.closeDialog} />
      </CardContent>
    </Card>
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

export const NameEdit = translate()(NameEditImpl)
