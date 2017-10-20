import * as React from 'react'
import {bindActionCreators, Dispatch} from 'redux'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {returntypeof} from 'react-redux-typescript'
import {Dropdown} from '../material/dropdown'
import {setCardsAction} from './actions/set-cards'
import {setRoundsAction} from './actions/set-rounds'
import {optionsSourcesSelector} from './selectors/options-sources'
import {setStartingRoundAction} from './actions/set-starting-round'
import {IRootState, ITranslateMixin} from '../types'
import style from './entry.css'

const mapStateToProps = (state: IRootState) => {
  const {entry} = state
  return {
    sources: optionsSourcesSelector(state),
    cards: entry.cards,
    rounds: entry.rounds,
    startingRound: entry.startingRound
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    setCards: setCardsAction,
    setRounds: setRoundsAction,
    setStartingRound: setStartingRoundAction
  }, dispatch)

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type EntryOptionsProps = typeof stateType & typeof dispatchType & ITranslateMixin

export function EntryOptionsImpl({t, sources, cards, rounds, startingRound, setCards, setRounds, setStartingRound}: EntryOptionsProps) {
  return (
    <div className={style.optionsRootContainer}>
      <Dropdown label={t('Number of cards')}
                className={style.optionsDropdown}
                value={cards} source={sources.cards}
                onChange={setCards} />

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

export const EntryOptions = translate()(connect(mapStateToProps, mapDispatchToProps)(EntryOptionsImpl as any))
