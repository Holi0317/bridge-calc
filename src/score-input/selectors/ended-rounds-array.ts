import {createSelector} from 'reselect'
import range from 'lodash-es/range'
import {stageSelector} from './stage'
import {currentRoundSelector} from './current-round'
import {GameStage} from '../game-stage'
import {roundsSelector} from './rounds'

/**
 * Select number of rounds in forms of array that has ended.
 * Like range(endedRounds - 1).
 * For example, if currentRound is 1, then this will return [].
 * If currentRound is 2, then this will return [1].
 * If game has ended at round 13, the this will return [1..13].
 * Null state will return []
 */
export const endedRoundsArraySelector = createSelector(
  stageSelector,
  roundsSelector,
  currentRoundSelector,
  (stage: GameStage | null, rounds: number, currentRound: number): number[] => {
    if (!stage) {
      return []
    }
    if (stage === GameStage.ended) {
      return range(1, rounds + 1)
    }
    return range(1, currentRound)
  }
)
