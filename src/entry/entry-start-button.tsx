import * as React from 'react'
import {bindActionCreators, Dispatch} from 'redux'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import flowRight from 'lodash-es/flowRight'
import {entryOptionsValidator, isEntryOptionsValid} from './entry-validator'
import {startAction} from '../score-input/actions/start'
import {$call, IRootState, ITranslateMixin} from '../types'
import style from './entry.css'

const mapStateToProps = (state: IRootState, {t}: ITranslateMixin) => ({
  rounds: state.entry.rounds,
  playerNames: state.entry.playerNames,
  startingRound: state.entry.startingRound,
  valid: isEntryOptionsValid(state, t),
  miscError: entryOptionsValidator(state, t).misc
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({start: startAction}, dispatch)

const stateType = $call(mapStateToProps)
const dispatchType = $call(mapDispatchToProps)

type EntryStartButtonProps = typeof stateType & typeof dispatchType & RouteComponentProps<any> & ITranslateMixin

export class EntryStartButtonImpl extends React.PureComponent {
  public props: EntryStartButtonProps

  public render() {
    const {valid, miscError, t} = this.props
    return (
      <div className={style.startBtnContainer}>
        <RaisedButton primary={true} disabled={!valid} onClick={this.start}>{t('Start')}</RaisedButton>
        <span className={style.errorMessage}>{miscError}</span>
      </div>
    )
  }

  private start = () => {
    const {rounds, playerNames, startingRound, start, history} = this.props
    start(rounds, playerNames, startingRound)
    history.push('/score-input')
  }
}

export const EntryStartButton = flowRight(
  withRouter,
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(EntryStartButtonImpl)
