import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators, Dispatch} from 'redux'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {$call} from 'utility-types'
import {Dropdown} from '../material/dropdown'
import {setRoundsAction, setStartingRoundAction} from './actions/set-entry-props'
import {optionsSourcesSelector} from './selectors/options-sources'
import {IRootState, ITranslateMixin} from '../types'
import style from './entry.css'

const mapStateToProps = (state: IRootState) => {
  const {entry} = state
  return {
    sources: optionsSourcesSelector(state),
    rounds: entry.rounds,
    startingRound: entry.startingRound
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    setRounds: setRoundsAction,
    setStartingRound: setStartingRoundAction
  }, dispatch)

const stateType = $call(mapStateToProps)
const dispatchType = $call(mapDispatchToProps)

type EntryOptionsProps = typeof stateType & typeof dispatchType & ITranslateMixin

export function EntryOptionsImpl({t, sources, rounds, startingRound, setRounds, setStartingRound}: EntryOptionsProps) {
  return (
    <div className={style.optionsRootContainer}>
      <Dropdown label={t('Number of rounds')}
                className={style.optionsDropdown}
                value={rounds} source={sources.rounds}
                onChange={setRounds} />

      <Dropdown label={t('Starting round')}
                className={style.optionsDropdown}
                value={startingRound} source={sources.startingRound}
                onChange={setStartingRound} />
    </div>
  )
}

export const EntryOptions = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(EntryOptionsImpl)
