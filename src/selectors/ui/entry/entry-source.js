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

/**
 * Select Dropdown source for entry options.
 */
export const entrySourceSelector = createSelector(
  (state: RootState) => state.ui.entry.cards,
  (state: RootState) => state.ui.entry.playerNames.length,
  (cards: number, playerLength: number): EntrySource => {
    const maxRounds = Math.floor(cards / playerLength)
    const rounds = playerLength > 0
      ? createSource(range(1, maxRounds + 1))
      : [{value: 1, label: '1'}]
    return {
      cards: cardsSource,
      rounds,
      startingRound: rounds
    }
  }
)

export type EntrySource = {
  cards: DropdownSource<number>[],
  rounds: DropdownSource<number>[],
  startingRound: DropdownSource<number>[]
}
