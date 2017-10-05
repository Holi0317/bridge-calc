import * as React from 'react'
import {bindActionCreators, Dispatch} from 'redux'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {returntypeof} from 'react-redux-typescript'
import {Dropdown} from '../material/dropdown'
import {setCards} from './actions/set-cards'
import {setRounds} from './actions/set-rounds'
import {optionsSourcesSelector} from './selectors/options-sources'
import {setStartingRound} from './actions/set-starting-round'
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
  bindActionCreators({setCards, setRounds, setStartingRound}, dispatch)

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type EntryOptionsProps = typeof stateType & typeof dispatchType & ITranslateMixin

export function EntryOptionsImpl({t, sources, cards, rounds, startingRound, setCards, setRounds, setStartingRound}: EntryOptionsProps) {
  return (
    <div className={style.optionsRootContainer}>
      <div className={style.optionsContainer}>
        <span>{t('Number of cards')}</span>
        <Dropdown label={t('Number of cards')}
          value={cards} source={sources.cards}
          onChange={setCards} />
      </div>

      <div className={style.optionsContainer}>
        <span>{t('Number of rounds')}</span>
        <Dropdown label={t('Number of rounds')}
          value={rounds} source={sources.rounds}
          onChange={setRounds} />
      </div>

      <div className={style.optionsContainer}>
        <span>{t('Starting round')}</span>
        <Dropdown label={t('Starting round')}
          value={startingRound} source={sources.startingRound}
          onChange={setStartingRound} />
      </div>
    </div>
  )
}

export const EntryOptions = translate()(connect(mapStateToProps, mapDispatchToProps)(EntryOptionsImpl as any))
