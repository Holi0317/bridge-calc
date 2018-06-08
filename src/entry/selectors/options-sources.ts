import {createSelector} from 'reselect'
import range from 'lodash-es/range'
import {createSource} from '../../utils'
import {IRootState} from '../../types'
import {IDropdownSource} from '../../material/dropdown'

// Rounds source to be used when there is no player available.
const defaultRounds = [{value: 1, label: '1'}]

/**
 * Select Dropdown source for entry options.
 */
export const optionsSourcesSelector = createSelector(
  (state: IRootState) => state.entry.playerNames.length,
  (state: IRootState) => state.entry.rounds,
  (playerLength: number, selectedRounds: number): IEntrySource => {
    const maxRounds = Math.floor(52 / playerLength)
    const rounds = playerLength > 0
      ? createSource(range(1, maxRounds + 1))
      : defaultRounds
    const startingRound = playerLength > 0
      ? createSource(range(1, selectedRounds + 1))
      : defaultRounds
    return {
      rounds,
      startingRound
    }
  }
)

export interface IEntrySource {
  rounds: Array<IDropdownSource<number>>,
  startingRound: Array<IDropdownSource<number>>
}
