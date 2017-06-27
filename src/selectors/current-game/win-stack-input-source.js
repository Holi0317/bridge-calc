// @flow
import {createSelector} from 'reselect'
import range from 'lodash-es/range'
import sum from 'lodash-es/sum'
import values from 'lodash-es/values'
import fromPairs from 'lodash-es/fromPairs'
import {stackInputSourceCommonSelector} from './stack-input-source-common'
import {currentRoundSelector} from './current-round'
import {playerIDSelector} from './player-id'
import {stageSelector} from './stage'
import {winSelector} from './win'
import {createSource, fillObj} from '../../utils'
import {GameStage} from '../../game-stage'

import type {StackInputSourceCommon} from './stack-input-source-common'
import type {DropdownSource, PlayerMap} from '../../types'

/**
 * Select input source for MDC's dropdown on win stack.
 */
export const winStackInputSourceSelector = createSelector(
  stackInputSourceCommonSelector,
  stageSelector,
  playerIDSelector,
  currentRoundSelector,
  winSelector,
  (common: StackInputSourceCommon, stage: string, playerID: string[], currentRound: number, winMap: PlayerMap<number>): PlayerMap<DropdownSource<number>[]> => {
    if (common) {
      return common
    }
    const defaultSrc = createSource(range(currentRound + 1))
    const winSum: number = sum(values(winMap))

    // Short circuit.
    // No-op when there is excess win
    // Or stage is not at waitingWin
    if (stage !== GameStage.waitingWin || winSum > currentRound) {
      return fillObj({}, playerID, defaultSrc)
    }

    // Surgery on win options
    // Cannot choose a win that exceed currentRound
    const delta = currentRound - winSum
    const head = createSource(range(delta + 1))
    const tail = range(delta + 1, currentRound + 1)
      .map(i => ({value: i, label: i + '', disabled: true}))
    const restSrc = head.concat(tail)

    const pairs = playerID
      .map(ID => {
        const selectedWin = winMap[ID]
        const src = (selectedWin <= 0 || selectedWin == null)
          ? restSrc
          : defaultSrc
        return [ID, src]
      })

    return fromPairs(pairs)
  }
)
