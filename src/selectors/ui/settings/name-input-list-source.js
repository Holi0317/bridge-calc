// @flow
import {createSelector} from 'reselect'
import {namesSelector} from './names'
import toPairs from 'lodash/toPairs'

import type {PlayerMap} from '../../../types'

/**
 * Select names source used for name-input-list component for usage in settings view.
 */
export const nameInputListSourceSelector = createSelector(
  namesSelector,
  (names: PlayerMap<string>) => (
    toPairs(names)
  )
)
