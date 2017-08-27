// @flow
import {h} from 'preact'
import {connect} from 'preact-redux'
import {translate} from 'react-i18next'
import {namesSelector} from '../../selectors/current-game/names'
import {playerScoresSelector} from '../../selectors/current-game/player-scores'
import {playerTotalScoreSelector} from '../../selectors/current-game/player-total-score'
import {playerRankSelector} from '../../selectors/current-game/player-rank'
import {endedRoundsArraySelector} from '../../selectors/current-game/ended-rounds-array'
import {toPairs} from '../../utils'
import style from './scoreboard.css'
import grid from '../../styles/grid.css'

import type {IPlayerMap, RootState, I18nT} from '../../types'

type ScoreboardProps = {
  names: IPlayerMap<string>,
  scores: IPlayerMap<number[]>,
  totalScores: IPlayerMap<number>,
  ranks: IPlayerMap<string>,
  endedRounds: number[],
  t: I18nT
}

function DisconnectScoreboard({t, names, scores, endedRounds, totalScores, ranks}: ScoreboardProps) {
  return (
    <div className={grid.container}>
      <div className={style.tableContainer}>
        <table className={style.table}>

          <thead>
            {/* Player names */}
            <tr>
              <th>{t('Name')}</th>
              {toPairs(names).map(([playerID, name]) => (
                <th key={playerID}>{name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Scores for each round */}
            {endedRounds.map(i => (
              <tr key={i}>
                <td>{t('Round {{n}}', {n: i})}</td>
                {toPairs(scores).map(([playerID, scores]) => (
                  <td key={playerID}>{scores[i - 1]}</td>
                ))}
              </tr>
            ))}

            {/* Total scores */}
            <tr>
              <td>{t('Total score')}</td>
              {toPairs(totalScores).map(([playerID, total]) => (
                <td key={playerID}>{total}</td>
              ))}
            </tr>

            {/* Rank */}
            <tr>
              <td>{t('Rank')}</td>
              {toPairs(ranks).map(([playerID, rank]) => (
                <td key={playerID}>{rank}</td>
              ))}
            </tr>
          </tbody>

        </table>
      </div>
    </div>
  )
}

function mapStateToProps(state: RootState) {
  return {
    names: namesSelector(state),
    scores: playerScoresSelector(state),
    totalScores: playerTotalScoreSelector(state),
    ranks: playerRankSelector(state),
    endedRounds: endedRoundsArraySelector(state)
  }
}

export const Scoreboard = translate()(connect(mapStateToProps)(DisconnectScoreboard))
