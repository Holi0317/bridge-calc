// @flow
import {createSelector} from 'reselect'
import range from 'lodash-es/range'
import sum from 'lodash-es/sum'
import values from 'lodash-es/values'
import last from 'lodash-es/last'
import {stackInputSourceCommonSelector} from './stack-input-source-common'
import {currentRoundSelector} from './current-round'
import {bidSelector} from './bid'
import {playerIDSelector} from './player-id'
import {playerOrderSelector} from './player-order'
import {createSource, fillObj} from '../../utils'

import type {StackInputSourceCommon} from './stack-input-source-common'
import type {IDropdownSource, IPlayerMap} from '../../types'

/**
 * Select input source for MDC's dropdown on bid stack.
 */
export const bidStackInputSourceSelector = createSelector(
  stackInputSourceCommonSelector,
  playerIDSelector,
  currentRoundSelector,
  bidSelector,
  playerOrderSelector,
  (common: StackInputSourceCommon, playerID: string[], currentRound: number, bidMap: IPlayerMap<number>, playerOrder: string[]): IPlayerMap<IDropdownSource<number>[]> => {
    if (common) {
      return common
    }
    const defaultSrc = createSource(range(currentRound + 1))
    const bid = fillObj({}, playerID, defaultSrc)
    const bidSum: number = sum(values(bidMap))

    // Surgery on bid options
    // Rules for bridge game. Last player cannot select the one that will cause sum == currentRound
    if (bidSum <= currentRound) {
      const lastPlayerID: string = last(playerOrder)
      const delta = currentRound - bidSum
      const option = {value: delta, label: delta + '', disabled: true}

      // All bid in the map points to the same object. A clone on the map is needed before mutating it.
      const clonedOptions = bid[lastPlayerID].slice()
      clonedOptions[delta] = option
      bid[lastPlayerID] = clonedOptions
    }
    return bid
  }
)
