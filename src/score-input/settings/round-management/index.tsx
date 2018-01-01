import * as React from 'react'
import {translate} from 'react-i18next'
import Snackbar from 'material-ui/Snackbar'
import Card, {CardHeader, CardText} from 'material-ui/Card'
import {SkipRounds} from './skip-rounds'
import {ITranslateMixin} from '../../../types'
import style from '../settings.css'

interface IRoundManagementState {
  toastOpen: boolean,
  toastMsg: string
}

export class RoundManagementImpl extends React.Component {
  public props: ITranslateMixin
  public state: IRoundManagementState = {
    toastOpen: false,
    toastMsg: ''
  }

  public render() {
    const {t} = this.props
    const {toastOpen, toastMsg} = this.state

    return <Card className={style.sessionCard}>
      <CardHeader
        title={t('Skip rounds')}
        actAsExpander={false}
        showExpandableButton={false}
      />
      <CardText>
        <SkipRounds requestToast={this.openToast} />
        <Snackbar
          open={toastOpen}
          message={toastMsg}
          autoHideDuration={3000}
          onRequestClose={this.closeToast}
        />
      </CardText>
    </Card>
  }

  private openToast = (round: number | null) => {
    const {t} = this.props
    this.setState(() => ({
      toastOpen: true,
      toastMsg: round
        ? t('Skipped round(s). You are now playing round {{round}}', {round})
        : t('Game ended')
    }))
  }

  private closeToast = () => {
    this.setState(() => ({
      toastOpen: false
    }))
  }
}

export const RoundManagement = translate()(RoundManagementImpl)
