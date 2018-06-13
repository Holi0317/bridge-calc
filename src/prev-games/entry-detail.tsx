import * as React from 'react'
import {translate} from 'react-i18next'
import {TranslationFunction} from 'i18next'
import * as format from 'date-fns/format'
import * as distanceInWords from 'date-fns/distance_in_words'
import Table from '@material-ui/core/Table/Table'
import TableBody from '@material-ui/core/TableBody/TableBody'
import TableRow from '@material-ui/core/TableRow/TableRow'
import TableCell from '@material-ui/core/TableCell/TableCell'
import {GameStage} from '../score-input/game-stage'
import {PrevGameEntry} from './types'
import {ITranslateMixin} from '../types'

function gameStage(stage: GameStage, t: TranslationFunction): string {
  switch (stage) {
  case GameStage.waitingBid:
    return t('Waiting for Bid stack')
  case GameStage.waitingWin:
    return t('Waiting for win stack')
  case GameStage.ended:
    return t('Ended')
  }
}

interface IEntryDetailProps extends ITranslateMixin {
  entry: PrevGameEntry
}

export class EntryDetailImpl extends React.Component<IEntryDetailProps> {
  public render() {
    const {entry, t} = this.props

    return <Table>
      <TableBody>

        <TableRow>
          <TableCell>{t('Starting time')}</TableCell>
          <TableCell>{format(entry.startTime, 'DD MMM YYYY HH:mm:ss')}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>{t('ID')}</TableCell>
          <TableCell>{entry.id}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>{t('Current Stage')}</TableCell>
          <TableCell>{gameStage(entry.stage, t)}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>{t('Total rounds')}</TableCell>
          <TableCell>{entry.rounds}</TableCell>
        </TableRow>

        {entry.stage === GameStage.ended ? (
          <TableRow>
            <TableCell>{t('Ending time')}</TableCell>
            <TableCell>{format(entry.endTime, 'DD MMM YYYY HH:mm:ss')}</TableCell>
          </TableRow>
          ) : (
          <TableRow>
            <TableCell>{t('Current round')}</TableCell>
            <TableCell>{entry.currentRound}</TableCell>
          </TableRow>
        )}

        {entry.stage === GameStage.ended && (
          <TableRow>
            <TableCell>{t('Time used')}</TableCell>
            <TableCell>{distanceInWords(entry.startTime, entry.endTime)}</TableCell>
          </TableRow>
        )}

      </TableBody>
    </Table>
  }
}

export const EntryDetail = translate()(EntryDetailImpl)
