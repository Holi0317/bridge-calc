import * as React from 'react'
import {translate} from 'react-i18next'
import {ITranslateMixin} from '../../types'
import {MakerEditor} from './maker-editor'
import {SkipRounds} from './skip-rounds'
import Snackbar from 'material-ui/Snackbar'

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

    return (
      <div>
        <h4>{t('Change maker')}</h4>
        <MakerEditor />
        <h4>{t('Skip rounds')}</h4>
        <SkipRounds requestToast={this.openToast} />
        <Snackbar
          open={toastOpen}
          message={toastMsg}
          autoHideDuration={3000}
          onRequestClose={this.closeToast}
        />
      </div>
    )
  }

  private openToast = (round: number | null) => {
    const {t} = this.props
    this.setState(() => ({
      toastOpen: true,
      toastMsg: round ? t(`Skipped round(s). You are now playing round ${round}`) : t('Game ended')
    }))
  }

  private closeToast = () => {
    this.setState(() => ({
      toastOpen: false
    }))
  }
}

export const RoundManagement = translate()(RoundManagementImpl)
