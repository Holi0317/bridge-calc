import {createSelector} from 'reselect'
import {namesSelector} from './names'
import {IDropdownSource, IPlayerMap} from '../../../types'

/**
 * Select dropdown source for selecting maker from settings view.
 */
export const makerSourceSelector = createSelector(
  namesSelector,
  (names: IPlayerMap<string>): Array<IDropdownSource<string>> => (
    Object.entries(names)
      .map(([ID, name]) => ({
        value: ID,
        label: name
      }))
  )
)
