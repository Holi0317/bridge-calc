import {createSelector} from 'reselect'
import {namesSelector} from './names'
import {IPlayerMap} from '../../../types'
import {IDropdownSource} from '../../../material/dropdown'

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
