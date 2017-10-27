import * as React from 'react'
import {translate} from 'react-i18next'
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

  private async install() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js')
        if (!registration) {
          // WTF no registration????
          return
        }

        // New installation notify logic
        const sw = registration.installing || registration.waiting
        if (sw) {
          sw.addEventListener('statechange', () => {
            if (sw.state === 'activated') {
              this.openSnackbar('This app is now available offline')
            }
          })
        }

        // Update notification logic
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed') {
                this.openSnackbar('App will update after page reload')
              }
            })
          }
        })
      } catch (err) {
        console.error('Error when registering service worker', err)
      }

    }
  }

  private openSnackbar = (msg: string) => {
    this.setState(() => ({
      barOpen: true,
      message: this.props.t(msg)
    }))
  }

  private handleRequestClose = () => {
    this.setState(() => ({
      barOpen: false
    }))
  }
}

export const SWReg = translate()(SWRegImpl as any)
