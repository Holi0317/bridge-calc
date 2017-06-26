// @flow
import {createSelector} from 'reselect'

import type {PlayerMap, RootState} from '../../types'

/**
 * Select all player ID as an array.
 * If player ID is not available, empty array will be returned
 */
export const playerIDSelector = createSelector(
  (state: RootState) => state.currentGame ? state.currentGame.names : null,
  (names: ?PlayerMap<string>): string[] => {
    if (!names) {
      return []
    }
    return Object.keys(names)
  }
)
