// @flow
import {createSelector} from 'reselect'
import range from 'lodash/range'
import values from 'lodash/values'
import sum from 'lodash/sum'
import last from 'lodash/last'
import {GameStage} from '../game-stage'
import {stageSelector} from './stage'
import {playerIDSelector} from './player-id'
import {currentRoundSelector} from './current-round'
import {playerOrderSelector} from './player-order'
import {bidSelector} from './bid'
import {winSelector} from './win'
import {createSource, fillObj} from '../utils'

import type {DropdownSource, PlayerMap} from '../types'

/**
 * Select input source for MDC's dropdown
 */
export const inputSourceSelector = createSelector(
  stageSelector,
  playerIDSelector,
  currentRoundSelector,
  bidSelector,
  winSelector,
  playerOrderSelector,
  (stage: ?string, playerID: string[], currentRound: number, bidMap: PlayerMap<number>, winMap: PlayerMap<number>, playerOrder: string[]): InputSource => {
    // No option for null state
    if (stage == null) {
      return {
        bid: {},
        win: {}
      }
    }

    // Ended state. Each player will have one disabled option
    if (stage === GameStage.ended) {
      const source = [
        {value: 0, label: '0', disabled: true}
      ]
      const map = fillObj({}, playerID, source)
      return {
        bid: map,
        win: map
      }
    }

    const rootMap = createSource(range(currentRound + 1))
    const bid = fillObj({}, playerID, rootMap)
    const win = fillObj({}, playerID, rootMap)

    // Surgery on bid options
    // Rules for bridge game. Last player cannot select the one that will cause sum == currentRound
    const bidSum: number = sum(values(bidMap))
    if (bidSum <= currentRound) {
      const lastPlayerID: string = last(playerOrder)
      const delta = currentRound - bidSum
      const option = {value: delta, label: delta + '', disabled: true}

      // All bid in the map points to the same object. A clone on the map is needed before mutating it.
      const clonedOptions = bid[lastPlayerID].slice()
      clonedOptions[delta] = option
      bid[lastPlayerID] = clonedOptions
    }

    // Surgery on win options
    // Cannot choose a win that exceed currentRound
    const winSum: number = sum(values(winMap))
    if (stage === GameStage.waitingWin && winSum <= currentRound) {
      const delta = currentRound - winSum
      const head = createSource(range(delta + 1))
      const tail = range(delta + 1, currentRound + 1)
        .map(i => ({value: i, label: i + '', disabled: true}))
      const restSrc = head.concat(tail)

      for (const ID of playerID) {
        const selectedWin = winMap[ID]
        if (selectedWin <= 0 || selectedWin == null) {
          win[ID] = restSrc
        }
      }
    }

    return {
      bid,
      win
    }
  }
)

/**
 * The selected object type for input source
 */
export type InputSource = {
  bid: PlayerMap<DropdownSource<number>[]>,
  win: PlayerMap<DropdownSource<number>[]>
}
