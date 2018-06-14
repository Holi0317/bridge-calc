import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {Theme, withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import {GameState} from '../reducer'
import {computeData} from './compute-data'
import {ITranslateMixin} from '../../types'
import classes from './scoreboard.pcss'

interface IScoreboardTableProps extends ITranslateMixin {
  entry: NonNullable<GameState>,
  mini: boolean,
  classes: {[className: string]: string}
}

const styles = (theme: Theme) => ({
  errorText: {
    color: theme.palette.error.main
  }
})

export function ScoreboardTableImpl({entry, mini, classes: cls, t}: IScoreboardTableProps) {
  const {names, scores, prevScores, totalScores, ranks, endedRounds} = computeData(entry)

  return (
    <Paper className={classes.tableContainer}>
      <Table className={classes.table}>

        <TableHead>
          {/* Player names */}
          <TableRow>
            <TableCell>{t('Name')}</TableCell>
            {Object.entries(names).map(([playerID, name]) => (
              <TableCell key={playerID}>{name}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>

          {mini ? (
            <TableRow>
              <TableCell>{t('Previous round score')}</TableCell>
              {Object.entries(prevScores).map(([playerID, score]) => (
                <TableCell numeric key={playerID}
                           className={score < 0 ? cls.errorText : ''}>
                  {score}
                </TableCell>
              ))}
            </TableRow>
          ) : (
            endedRounds.map(i => (
              <TableRow key={i}>
                <TableCell>{t('Round {{n}}', {n: i})}</TableCell>
                {Object.entries(scores).map(([playerID, score]) => (
                  <TableCell numeric key={playerID}
                             className={score[i - 1] < 0 ? cls.errorText : ''}>
                    {score[i - 1]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}

          {/* Total scores */}
          <TableRow className={classes.totalScore}>
            <TableCell>{t('Total score')}</TableCell>
            {Object.entries(totalScores).map(([playerID, total]) => (
              <TableCell numeric key={playerID}
                         className={total < 0 ? cls.errorText : ''}>
                {total}
              </TableCell>
            ))}
          </TableRow>

          {/* Rank */}
          <TableRow>
            <TableCell>{t('Rank')}</TableCell>
            {Object.entries(ranks).map(([playerID, rank]) => (
              <TableCell numeric key={playerID}>{rank}</TableCell>
            ))}
          </TableRow>
        </TableBody>

      </Table>
    </Paper>
  )
}

export const ScoreboardTable = flowRight(
  withStyles(styles),
  translate()
)(ScoreboardTableImpl)
