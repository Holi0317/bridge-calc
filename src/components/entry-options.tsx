import * as React from 'react'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {returntypeof} from 'react-redux-typescript'
import {ROUNDS_SET, CARDS_SET, STARTING_ROUND_SET} from '../actions/ui/entry'
import {entrySourceSelector} from '../selectors/ui/entry/entry-source'
import {Dispatch, IRootState, ITranslateMixin} from '../types'
import {Dropdown} from '../material/dropdown'
import style from './entry-options.css'

const mapStateToProps = (state: IRootState) => {
  const entry = state.ui.entry
  return {
    sources: entrySourceSelector(state),
    cards: entry.cards,
    rounds: entry.rounds,
    startingRound: entry.startingRound
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  cardsSet(payload: number) {
    dispatch({type: CARDS_SET, payload})
  },
  roundsSet(payload: number) {
    dispatch({type: ROUNDS_SET, payload})
  },
  startingRoundSet(payload: number) {
    dispatch({type: STARTING_ROUND_SET, payload})
  }
})

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type EntryOptionsProps = typeof stateType & typeof dispatchType & ITranslateMixin

function DisconnectedEntryOptions({t, sources, cards, rounds, startingRound, cardsSet, roundsSet, startingRoundSet}: EntryOptionsProps) {
  return (
    <div className={style.rootContainer}>
      <div className={style.selectContainer}>
        <span>{t('Number of cards')}</span>
        <Dropdown label={t('Number of cards')}
          value={cards} source={sources.cards}
          onChange={cardsSet} />
      </div>

      <div className={style.selectContainer}>
        <span>{t('Number of rounds')}</span>
        <Dropdown label={t('Number of rounds')}
          value={rounds} source={sources.rounds}
          onChange={roundsSet} />
      </div>

      <div className={style.selectContainer}>
        <span>{t('Starting round')}</span>
        <Dropdown label={t('Starting round')}
          value={startingRound} source={sources.startingRound}
          onChange={startingRoundSet} />
      </div>
    </div>
  )
}

export const EntryOptions = translate()(connect(mapStateToProps, mapDispatchToProps)(DisconnectedEntryOptions as any))
