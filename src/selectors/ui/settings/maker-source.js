// @flow
import {createSelector} from 'reselect'
import toPairs from 'lodash-es/toPairs'
import {namesSelector} from './names'

import type {IDropdownSource, IPlayerMap} from '../../../types'

/**
 * Select dropdown source for selecting maker from settings view.
 */
export const makerSourceSelector = createSelector(
  namesSelector,
  (names: IPlayerMap<string>): IDropdownSource<string>[] => (
    toPairs(names)
      .map(([ID, name]) => ({
        value: ID,
        label: name
      }))
  )
)
