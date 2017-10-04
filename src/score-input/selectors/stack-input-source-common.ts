// @flow
import {createSelector} from 'reselect'
import {stageSelector} from './stage'
import {playerIDSelector} from './player-id'
import {GameStage} from '../game-stage'
import {fillObj} from '../../utils'
import {IDropdownSource, IPlayerMap} from '../../types'

/**
 * A common base for input source selector.
 * This is intend to use internally. Component will not use this directly
 */
export const stackInputSourceCommonSelector = createSelector(
  stageSelector,
  playerIDSelector,
  (stage: GameStage | null, playerID: string[]) => {
    // No option for null state
    if (stage == null) {
      return {}
    }

    // Ended state. Each player will have one disabled option
    if (stage === GameStage.ended) {
      const source = [
        {value: 0, label: '0', disabled: true}
      ]
      return fillObj({}, playerID, source)
    }
  }
)

export type StackInputSourceCommon = IPlayerMap<Array<IDropdownSource<number>>> | null
