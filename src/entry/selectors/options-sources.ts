import {createSelector} from 'reselect'
import range from 'lodash-es/range'
import {createSource} from '../../utils'
import {IDropdownSource, IRootState} from '../../types'

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
export const optionsSourcesSelector = createSelector(
  (state: IRootState) => state.entry.cards,
  (state: IRootState) => state.entry.playerNames.length,
  (state: IRootState) => state.entry.rounds,
  (cards: number, playerLength: number, selectedRounds: number): IEntrySource => {
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

export interface IEntrySource {
  cards: Array<IDropdownSource<number>>,
  rounds: Array<IDropdownSource<number>>,
  startingRound: Array<IDropdownSource<number>>
}
