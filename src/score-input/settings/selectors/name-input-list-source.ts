import {createSelector} from 'reselect'
import fromPairs from 'lodash-es/fromPairs'
import {namesSelector} from './names'
import {IPlayerMap} from '../../../types'

/**
 * PlayerName structure to be passed into name-input-list component.
 * This represent one player in the system.
 * First string is the ID. Second string is the name.
 */
export type PlayerName = [string, string]

export function revert(data: PlayerName[]): IPlayerMap<string> {
  return fromPairs(data)
}

/**
 * Select names source used for name-input-list component for usage in settings view.
 */
export const nameInputListSourceSelector = createSelector(
  namesSelector,
  (names: IPlayerMap<string>): PlayerName[] => (
    Object.entries(names)
  )
)
