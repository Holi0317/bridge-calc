// @flow
import {createSelector} from 'reselect'
import toPairs from 'lodash/toPairs'
import {namesSelector} from './names'

import type {DropdownSource, PlayerMap} from '../../../types'

/**
 * Select dropdown source for selecting maker from settings view.
 */
export const makerSourceSelector = createSelector(
  namesSelector,
  (names: PlayerMap<string>): DropdownSource<string>[] => (
    toPairs(names)
      .map(([ID, name]) => ({
        value: ID,
        label: name
      }))
  )
)
