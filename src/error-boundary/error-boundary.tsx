import * as React from 'react'
import {translate} from 'react-i18next'
import {ITranslateMixin} from '../types'
import {Ouch} from './ouch'

interface IErrorBoundaryProps extends ITranslateMixin {
  children: React.ReactNode
}
interface IErrorBoundaryState {
  error: Error | null
}

export class ErrorBoundaryImpl extends React.Component {
  public props: IErrorBoundaryProps
  public state: IErrorBoundaryState = {
    error: null
  }

  public componentDidCatch(err: Error) {
    console.error(err)
    this.setState(() => ({
      error: err
    }))
  }

  public render() {
    const {error} = this.state
    if (error) {
      return <Ouch error={error} />
    }
    return this.props.children
  }
}

export const ErrorBoundary = translate()(ErrorBoundaryImpl)
