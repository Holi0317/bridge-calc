import * as React from 'react'
import {translate} from 'react-i18next'
import {Card, CardHeader, CardText} from 'material-ui/Card'
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
    const {t} = this.props
    const {dialogOpen} = this.state

    return <Card className={style.sessionCard}>
      <CardHeader
        title={t('Edit players')}
        actAsExpander={false}
        showExpandableButton={false}
      />
      <CardText>
        <SettingsPlayerList />
        <SettingsAddPlayer />
        <ActionButtons requestDialog={this.openDialog} />

        <MutateNameDialog open={dialogOpen} onRequestClose={this.closeDialog} />
      </CardText>
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
