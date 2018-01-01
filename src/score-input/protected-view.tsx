import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators, Dispatch} from 'redux'
import {Redirect, Route} from 'react-router'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {returntypeof} from 'react-redux-typescript'
import {GameStage} from './game-stage'
import {stageSelector} from './selectors/stage'
import {showToastAction} from '../toast-singleton/actions/show-toast'
import {IRootState, ITranslateMixin} from '../types'

interface IProtectedViewProps {
  comp: React.ComponentType<{}>
}

const mapStateToProps = (state: IRootState) => ({
  ended: stageSelector(state) === GameStage.ended
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    showToast: showToastAction
  }, dispatch)

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type ProtectedViewProps = IProtectedViewProps & typeof stateType & typeof dispatchType & ITranslateMixin

export class ProtectedViewImpl extends React.Component {
  public props: ProtectedViewProps

  public componentWillMount() {
    this.attemptShowToast(this.props)
  }

  public componentWillReceiveProps(props: ProtectedViewProps) {
    this.attemptShowToast(props)
  }

  public render() {
    const {comp: Comp, ended} = this.props
    return <Route render={() => {
      if (ended) {
        return <Redirect to="/score-input/scoreboard"/>
      }
      return <Comp/>
    }}/>
  }

  private attemptShowToast({ended, showToast, t}: ProtectedViewProps) {
    if (ended) {
      showToast(t('Game has ended'))
    }
  }
}

export const ProtectedView = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(ProtectedViewImpl) as React.ComponentType<IProtectedViewProps>
