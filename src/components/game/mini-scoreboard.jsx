// @flow
import {h} from 'preact'
import mapValues from 'lodash/mapValues'
import last from 'lodash/last'
import sum from 'lodash/sum'
import values from 'lodash/values'
import {connect} from 'preact-redux'
import {translate} from 'react-i18next'
import styles from './mini-scoreboard.css'
import {toPairs} from '../../utils'

import type {PlayerMap, RootState, T} from '../../types'

type MiniScoreboardProps = {
  names: PlayerMap<string>,
  prevScores: PlayerMap<number>,
  totalScores: PlayerMap<number>,
  ranks: PlayerMap<string>,
  t: T
}

function DisconnectMiniScoreboard({names, prevScores, totalScores, ranks, t}: MiniScoreboardProps) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>

        <thead>
        <tr>
          <th>{t('Name')}</th>
          {toPairs(names).map(([playerID, name]) => (
            <th key={playerID}>{name}</th>
          ))}
        </tr>
        </thead>

        <tbody>
        <tr>
          <td>{t('Previous round score')}</td>
          {toPairs(prevScores).map(([playerID, score]) => (
            <td key={playerID}>{score}</td>
          ))}
        </tr>
        <tr>
          <td>{t('Total score')}</td>
          {toPairs(totalScores).map(([playerID, score]) => (
            <td key={playerID}>{score}</td>
          ))}
        </tr>
        <tr>
          <td>{t('Rank')}</td>
          {toPairs(ranks).map(([playerID, rank]) => (
            <td key={playerID}>{rank}</td>
          ))}
        </tr>
        </tbody>
      </table>
    </div>
  )
}

function toOrdinal(value: number): string {
  const suffix = ['th', 'st', 'nd', 'rd']
  const v = value % 100
  return value + (suffix[(v - 20) % 10] || suffix[v] || suffix[0])
}

function compRank(scores: PlayerMap<number>): PlayerMap<string> {
  const sortedScores: number[] = values(scores).sort((a, b) => b - a)
  return mapValues(scores, score => toOrdinal(sortedScores.indexOf(score) + 1))
}

function mapStateToProps(state: RootState) {
  const currentGame = state.currentGame
  if (!currentGame) {
    return {
      names: {},
      prevScores: {},
      totalScores: {},
      rank: {}
    }
  }
  const totalScores = mapValues(currentGame.scores, score => sum(score))
  return {
    names: currentGame.names,
    prevScores: mapValues(currentGame.scores, score => last(score) || 0),
    totalScores,
    ranks: compRank(totalScores)
  }
}

export const MiniScoreboard = translate()(connect(mapStateToProps)(DisconnectMiniScoreboard))

