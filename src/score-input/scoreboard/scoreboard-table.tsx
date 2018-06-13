import * as React from 'react'
import {translate} from 'react-i18next'
import {ITranslateMixin} from '../../types'
import {GameState} from '../reducer'
import {computeData} from './compute-data'
import style from './scoreboard.css'

interface IScoreboardTableProps extends ITranslateMixin {
  entry: NonNullable<GameState>,
  mini: boolean
}

export function ScoreboardTableImpl({entry, mini, t}: IScoreboardTableProps) {
  const {names, scores, prevScores, totalScores, ranks, endedRounds} = computeData(entry)

  return (
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

        {mini ? (
          <tr>
            <td>{t('Previous round score')}</td>
            {Object.entries(prevScores).map(([playerID, score]) => (
              <td key={playerID}>{score}</td>
            ))}
          </tr>
        ) : (
          endedRounds.map(i => (
            <tr key={i}>
              <td>{t('Round {{n}}', {n: i})}</td>
              {Object.entries(scores).map(([playerID, score]) => (
                <td key={playerID}>{score[i - 1]}</td>
              ))}
            </tr>
          ))
        )}

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
  )
}

export const ScoreboardTable = translate()(ScoreboardTableImpl)
