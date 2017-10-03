import * as React from 'react'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {returntypeof} from 'react-redux-typescript'
import RaisedButton from 'material-ui/RaisedButton'
import flowRight from 'lodash-es/flowRight'
import {Dispatch, IPlayerMap, IRootState, ITranslateMixin} from '../types'
import style from './entry.css'
import {IStartAction, START} from '../score-input/score-input-actions'
import {genID} from '../utils'
import {RouteComponentProps, withRouter} from 'react-router'
import {entryOptionsValidator, isEntryOptionsValid} from './entry-validator'

/**
 * Change player names array to object with random generated player ID as key.
 * @param playerNames
 */
function namesToMap(playerNames: string[]) {
  const result: IPlayerMap<string> = {}
  playerNames.forEach(name => {
    result[genID()] = name
  })
  return result
}

const mapStateToProps = (state: IRootState, {t}: ITranslateMixin) => ({
  rounds: state.entry.rounds,
  playerNames: state.entry.playerNames,
  startingRound: state.entry.startingRound,
  valid: isEntryOptionsValid(state, t),
  miscError: entryOptionsValidator(state, t).misc
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  start(param: IStartAction) {
    const action: IStartAction = {...param, type: START}
    dispatch(action)
  }
})

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

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
    const startParam: IStartAction = {
      rounds,
      startingRound,
      playerNames: namesToMap(playerNames),
      startTime: new Date(),
      type: START
    }
    start(startParam)
    history.push('/score-input')
  }
}

export const EntryStartButton = flowRight(
  withRouter,
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(EntryStartButtonImpl)
