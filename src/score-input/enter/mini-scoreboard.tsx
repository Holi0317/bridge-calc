import * as React from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {returntypeof} from 'react-redux-typescript'
import {namesSelector} from '../selectors/names'
import {playerPrevScoreSelector} from '../selectors/player-prev-score'
import {playerTotalScoreSelector} from '../selectors/player-total-score'
import {playerRankSelector} from '../selectors/player-rank'
import {IRootState, ITranslateMixin} from '../../types'
import style from '../scoreboard/scoreboard.css'

const mapStateToProps = (state: IRootState) => ({
  names: namesSelector(state),
  prevScores: playerPrevScoreSelector(state),
  totalScores: playerTotalScoreSelector(state),
  ranks: playerRankSelector(state)
})

const stateType = returntypeof(mapStateToProps)

type MiniScoreboardProps = typeof stateType & ITranslateMixin

export function MiniScoreboardImpl({names, prevScores, totalScores, ranks, t}: MiniScoreboardProps) {
  return (
    <div className={style.tableContainer}>
      <table className={style.table}>

        <thead>
          <tr>
            <th>{t('Name')}</th>
            {Object.entries(names).map(([playerID, name]) => (
              <th key={playerID}>{name}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{t('Previous round score')}</td>
            {Object.entries(prevScores).map(([playerID, score]) => (
              <td key={playerID}>{score}</td>
            ))}
          </tr>
          <tr>
            <td>{t('Total score')}</td>
            {Object.entries(totalScores).map(([playerID, score]) => (
              <td key={playerID}>{score}</td>
            ))}
          </tr>
          <tr>
            <td>{t('Rank')}</td>
            {Object.entries(ranks).map(([playerID, rank]) => (
              <td key={playerID}>{rank}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export const MiniScoreboard = translate()(connect(mapStateToProps)(MiniScoreboardImpl as any))
