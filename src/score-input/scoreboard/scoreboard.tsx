import * as React from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {Container} from 'react-grid-system'
import {namesSelector} from '../selectors/names'
import {playerScoresSelector} from '../selectors/player-scores'
import {playerTotalScoreSelector} from '../selectors/player-total-score'
import {playerRankSelector} from '../selectors/player-rank'
import {endedRoundsArraySelector} from '../selectors/ended-rounds-array'
import style from './scoreboard.css'
import {IRootState, ITranslateMixin} from '../../types'
import {returntypeof} from 'react-redux-typescript'

const mapStateToProps = (state: IRootState) => ({
  names: namesSelector(state),
  scores: playerScoresSelector(state),
  totalScores: playerTotalScoreSelector(state),
  ranks: playerRankSelector(state),
  endedRounds: endedRoundsArraySelector(state)
})

const stateType = returntypeof(mapStateToProps)

type ScoreboardProps = typeof stateType & ITranslateMixin

export function ScoreboardImpl({t, names, scores, endedRounds, totalScores, ranks}: ScoreboardProps) {
  return (
    <Container>
      <div className={style.tableContainer}>
        <table className={style.table}>

          <thead>
            {/* Player names */}
            <tr>
              <th>{t('Name')}</th>
              {Object.entries(names).map(([playerID, name]) => (
                <th key={playerID}>{name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Scores for each round */}
            {endedRounds.map(i => (
              <tr key={i}>
                <td>{t('Round {{n}}', {n: i})}</td>
                {Object.entries(scores).map(([playerID, score]) => (
                  <td key={playerID}>{score[i - 1]}</td>
                ))}
              </tr>
            ))}

            {/* Total scores */}
            <tr>
              <td>{t('Total score')}</td>
              {Object.entries(totalScores).map(([playerID, total]) => (
                <td key={playerID}>{total}</td>
              ))}
            </tr>

            {/* Rank */}
            <tr>
              <td>{t('Rank')}</td>
              {Object.entries(ranks).map(([playerID, rank]) => (
                <td key={playerID}>{rank}</td>
              ))}
            </tr>
          </tbody>

        </table>
      </div>
    </Container>
  )
}

export const Scoreboard = translate()(connect(mapStateToProps)(ScoreboardImpl))
