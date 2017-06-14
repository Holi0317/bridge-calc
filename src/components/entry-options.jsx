// @flow
import {h} from 'preact'
import {translate} from 'react-i18next'
import {connect} from 'preact-redux'
import {ROUNDS_SET, CARDS_SET, STARTING_ROUND_SET} from '../actions/ui/entry'
import {entrySourceSelector} from '../selectors/entry-source'
import style from './entry-options.css'

import type {RootState, T} from '../types'
import type {EntrySource} from '../selectors/entry-source'
import {Dropdown} from './mdc/dropdown'

type EntryOptionsProps = {
  t: T,
  cards: number,
  rounds: number,
  startingRound: number,
  sources: EntrySource,
  disp: (action: string) => (value: number) => void
}

function DisconnectedEntryOptions({t, sources, cards, rounds, startingRound, disp}: EntryOptionsProps) {
  return (
    <div className={style.rootContainer}>
      <div className={style.selectContainer}>
        <span>{t('Number of cards')}</span>
        <Dropdown label={t('Number of cards')} allowBlank={false}
          value={cards} source={sources.cards}
          onChange={disp(CARDS_SET)} />
      </div>

      <div className={style.selectContainer}>
        <span>{t('Number of rounds')}</span>
        <Dropdown label={t('Number of rounds')} allowBlank={false}
          value={rounds} source={sources.rounds}
          onChange={disp(ROUNDS_SET)} />
      </div>

      <div className={style.selectContainer}>
        <span>{t('Starting round')}</span>
        <Dropdown label={t('Starting round')} allowBlank={false}
          value={startingRound} source={sources.startingRound}
          onChange={disp(STARTING_ROUND_SET)} />
      </div>
    </div>
  )
}

function mapStateToProps(state: RootState) {
  const entry = state.ui.entry
  return {
    sources: entrySourceSelector(state),
    cards: entry.cards,
    rounds: entry.rounds,
    startingRound: entry.startingRound
  }
}

function mapDispatchToProps(dispatch) {
  return {
    disp(action) {
      return (payload: number) => {
        dispatch({type: action, payload})
      }
    }
  }
}

export const EntryOptions = translate()(connect(mapStateToProps, mapDispatchToProps)(DisconnectedEntryOptions))
