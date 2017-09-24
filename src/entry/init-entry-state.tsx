import * as React from 'react'
import {connect} from 'react-redux'
import {returntypeof} from 'react-redux-typescript'
import {IPlayerNamesSetAction, PLAYER_NAMES_SET} from './entry-actions'
import {genRandomNames} from '../example-names'
import {Dispatch} from '../types'

const mapDispatchToProps = (dispatch: Dispatch) => ({
  genOptions() {
    const action: IPlayerNamesSetAction = {type: PLAYER_NAMES_SET, payload: genRandomNames()}
    dispatch(action)
  }
})

const dispatchType = returntypeof(mapDispatchToProps)

type InitEntryStateProps = typeof dispatchType

class InitEntryStateImpl extends React.PureComponent {
  public props: InitEntryStateProps

  public componentWillMount() {
    this.props.genOptions()
  }

  public render() {
    return null
  }
}

export const InitEntryState = connect(null, mapDispatchToProps)(InitEntryStateImpl as any)
