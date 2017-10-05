import * as React from 'react'
import {bindActionCreators, Dispatch} from 'redux'
import {connect} from 'react-redux'
import {returntypeof} from 'react-redux-typescript'
import {genRandomNames} from '../example-names'
import {setPlayerNames} from './actions/set-player-names'
import {reset} from './actions/reset'

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({reset, setPlayerNames}, dispatch)

const dispatchType = returntypeof(mapDispatchToProps)

type InitEntryStateProps = typeof dispatchType

export class InitEntryStateImpl extends React.PureComponent {
  public props: InitEntryStateProps

  public componentWillMount() {
    this.props.reset()
    this.props.setPlayerNames(genRandomNames())
  }

  public render() {
    return null
  }
}

export const InitEntryState = connect(null, mapDispatchToProps)(InitEntryStateImpl as any)
