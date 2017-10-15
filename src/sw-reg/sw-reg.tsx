import * as React from 'react'
import {translate} from 'react-i18next'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import {ITranslateMixin} from '../types'
import Snackbar from 'material-ui/Snackbar'

type SwRegProps = ITranslateMixin
interface ISWRegState {
  barOpen: boolean
  message: string
}

class SWRegImpl extends React.Component {
  public props: SwRegProps
  public state: ISWRegState = {
    barOpen: false,
    message: ''
  }

  public componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      this.install()
    }
  }

  public render() {
    const {barOpen, message} = this.state
    return (
      <Snackbar
        open={barOpen}
        message={message}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />
    )
  }

  private install() {
    const {t} = this.props
    OfflinePluginRuntime.install({
      onInstalled: () => {
        this.setState(() => ({
          barOpen: true,
          message: t('This app is now available offline')
        }))
      },
      onUpdateReady() {
        OfflinePluginRuntime.applyUpdate()
      },
      onUpdated: () => {
        this.setState(() => ({
          barOpen: true,
          message: t('App will update after page reload')
        }))
      }
    })
  }

  private handleRequestClose = () => {
    this.setState(() => ({
      barOpen: false
    }))
  }
}

export const SWReg = translate()(SWRegImpl as any)
