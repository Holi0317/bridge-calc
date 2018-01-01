import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {returntypeof} from 'react-redux-typescript'
import {IRootState, ITranslateMixin} from '../../types'
import {bindActionCreators, Dispatch} from 'redux'
import {showToastAction} from '../../toast-singleton/actions/show-toast'
import {stageSelector} from '../selectors/stage'
import {GameStage} from '../game-stage'
import {Redirect} from 'react-router'

const mapStateToProps = (state: IRootState) => ({
  shouldRedirect: stageSelector(state) === GameStage.ended
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    showToast: showToastAction
  }, dispatch)

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type EnterRedirectorProps = typeof stateType & typeof dispatchType & ITranslateMixin

export class EnterRedirectorImpl extends React.Component {
  public props: EnterRedirectorProps

  public componentWillMount() {
    this.attemptShowToast(this.props)
  }

  public componentWillReceiveProps(props: EnterRedirectorProps) {
    this.attemptShowToast(props)
  }

  public render() {
    return this.props.shouldRedirect ? <Redirect to="/score-input/scoreboard" /> : null
  }

  private attemptShowToast({shouldRedirect, showToast, t}: EnterRedirectorProps) {
    if (shouldRedirect) {
      showToast(t('Game has ended'))
    }
  }
}

export const EnterRedirector = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(EnterRedirectorImpl)
