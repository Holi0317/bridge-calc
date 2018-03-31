import {createSelector} from 'reselect'
import values from 'lodash-es/values'
import mapValues from 'lodash-es/mapValues'
import {playerTotalScoreSelector} from './player-total-score'
import {toOrdinal} from '../../utils'
import {IPlayerMap} from '../../types'

const TOP_EMOJI = [' 👑', ' 🥈', ' 🥉']
const LAST = ' 💩'

/**
 * Query emoji for this player.
 * First 3 places emoji will have higher priority than last one.
 * If no emoji available, empty string would be produced
 *
 * @param rank - 1-based rank of this player
 * @param isLast - is player at last position
 */
function getEmoji(rank: number, isLast: boolean): string {
  if (rank <= 3) {
    return TOP_EMOJI[rank - 1]
  }
  if (isLast) {
    return LAST
  }
  return ''
}

/**
 * Select player's ranks. With ordinal suffix and emoji.
 */
export const playerRankSelector = createSelector(
  playerTotalScoreSelector,
  (scores: IPlayerMap<number>): IPlayerMap<string> => {
    const sortedScores: number[] = values(scores).sort((a, b) => b - a)
    const lastScore = sortedScores[sortedScores.length - 1]
    return mapValues(scores, score => {
      const rank = sortedScores.indexOf(score) + 1
      return toOrdinal(rank) + getEmoji(rank, score === lastScore)
    })
  }
)
