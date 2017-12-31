import {createSelector} from 'reselect'
import {namesSelector as settingsNamesSelector} from './names'
import {namesSelector} from '../../selectors/names'
import {IPlayerMap} from '../../../types'

/**
 * Determine if settings name list has changed by doing an identity comparison (read: ===)
 */
export const namesChangedSelector = createSelector(
  settingsNamesSelector,
  namesSelector,
  (settingsName: IPlayerMap<string>, names: IPlayerMap<string>): boolean =>
    settingsName !== names
)
