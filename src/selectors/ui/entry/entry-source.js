// @flow
import {createSelector} from 'reselect'
import range from 'lodash-es/range'
import {createSource} from '../../../utils'

import type {DropdownSource, RootState} from '../../../types'

// This is a constant
const cardsSource = [
  {value: 52, label: '52'},
  {value: 104, label: '104'}
]

// Rounds source to be used when there is no player available.
const defaultRounds = [{value: 1, label: '1'}]

/**
 * Select Dropdown source for entry options.
 */
export const entrySourceSelector = createSelector(
  (state: RootState) => state.ui.entry.cards,
  (state: RootState) => state.ui.entry.playerNames.length,
  (state: RootState) => state.ui.entry.rounds,
  (cards: number, playerLength: number, selectedRounds: number): EntrySource => {
    const maxRounds = Math.floor(cards / playerLength)
    const rounds = playerLength > 0
      ? createSource(range(1, maxRounds + 1))
      : defaultRounds
    const startingRound = playerLength > 0
      ? createSource(range(1, selectedRounds + 1))
      : defaultRounds
    return {
      cards: cardsSource,
      rounds,
      startingRound
    }
  }
)

export type EntrySource = {
  cards: DropdownSource<number>[],
  rounds: DropdownSource<number>[],
  startingRound: DropdownSource<number>[]
}
