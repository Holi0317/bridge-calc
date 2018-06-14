import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators} from 'redux'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {Dropdown} from '../material/dropdown'
import {setRoundsAction, setStartingRoundAction} from './actions/set-entry-props'
import {optionsSourcesSelector} from './selectors/options-sources'
import {Dispatch, IRootState, ITranslateMixin} from '../types'
import style from './entry.pcss'

const mapStateToProps = (state: IRootState) => {
  const {entry} = state
  return {
    sources: optionsSourcesSelector(state),
    rounds: entry.rounds,
    startingRound: entry.startingRound
  }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    setRounds: setRoundsAction,
    setStartingRound: setStartingRoundAction
  }, dispatch)

type stateType = ReturnType<typeof mapStateToProps>
type dispatchType = ReturnType<typeof mapDispatchToProps>

type EntryOptionsProps = stateType & dispatchType & ITranslateMixin

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
