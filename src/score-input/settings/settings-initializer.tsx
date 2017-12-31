import * as React from 'react'
import {connect} from 'react-redux'
import {IRootState} from '../../types'
import {bindActionCreators, Dispatch} from 'redux'
import {returntypeof} from 'react-redux-typescript'
import {initSettingsAction} from './actions/init-settings'

const mapStateToProps = (state: IRootState) => ({
  currentGame: state.currentGame,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    init: initSettingsAction
  }, dispatch)

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type SettingsInitializerProps = typeof stateType & typeof dispatchType

export class SettingsInitializerImpl extends React.Component {
  public props: SettingsInitializerProps

  public componentWillMount() {
    const {init, currentGame} = this.props
    init(currentGame)
  }

  public render() {
    return null
  }
}

export const SettingsInitializer = connect(mapStateToProps, mapDispatchToProps)(SettingsInitializerImpl)
