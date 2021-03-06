import * as React from 'react'
import {bindActionCreators} from 'redux'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import Button from '@material-ui/core/Button'
import flowRight from 'lodash-es/flowRight'
import {entryOptionsValidator, isEntryOptionsValid} from './entry-validator'
import {startAction} from '../score-input/actions/start'
import {IRootState, ITranslateMixin, Dispatch} from '../types'
import classes from './entry.pcss'

const mapStateToProps = (state: IRootState, {t}: ITranslateMixin) => ({
  rounds: state.entry.rounds,
  playerNames: state.entry.playerNames,
  startingRound: state.entry.startingRound,
  valid: isEntryOptionsValid(state, t),
  miscError: entryOptionsValidator(state, t).misc
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({start: startAction}, dispatch)

type stateType = ReturnType<typeof mapStateToProps>
type dispatchType = ReturnType<typeof mapDispatchToProps>

type EntryStartButtonProps = stateType & dispatchType & RouteComponentProps<any> & ITranslateMixin

export class EntryStartButtonImpl extends React.PureComponent {
  public props: EntryStartButtonProps

  public render() {
    const {valid, miscError, t} = this.props
    return (
      <div className={classes.startBtnContainer}>
        <Button variant="contained" color="primary" disabled={!valid} onClick={this.start}>{t('Start')}</Button>
        <span className={classes.errorMessage}>{miscError}</span>
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
