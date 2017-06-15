// @flow
import {h} from 'preact'
import {connect} from 'preact-redux'
import {translate} from 'react-i18next'
import {namesSelector} from '../../selectors/names'
import {toPairs} from '../../utils'
import style from './mini-scoreboard.css'

import type {PlayerMap, RootState, T} from '../../types'
import {playerPrevScoreSelector} from '../../selectors/player-prev-score'
import {playerTotalScoreSelector} from '../../selectors/player-total-score'
import {playerRankSelector} from '../../selectors/player-rank'

type MiniScoreboardProps = {
  names: PlayerMap<string>,
  prevScores: PlayerMap<number>,
  totalScores: PlayerMap<number>,
  ranks: PlayerMap<string>,
  t: T
}

function DisconnectMiniScoreboard({names, prevScores, totalScores, ranks, t}: MiniScoreboardProps) {
  return (
    <div className={style.tableContainer}>
      <table className={style.table}>

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

function mapStateToProps(state: RootState) {
  return {
    names: namesSelector(state),
    prevScores: playerPrevScoreSelector(state),
    totalScores: playerTotalScoreSelector(state),
    rank: playerRankSelector(state)
  }
}

export const MiniScoreboard = translate()(connect(mapStateToProps)(DisconnectMiniScoreboard))

