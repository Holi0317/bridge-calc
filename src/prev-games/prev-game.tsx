import * as React from 'react'
import * as format from 'date-fns/format'
import * as distanceInWords from 'date-fns/distance_in_words'
import {PrevGameEntry} from './types'
import {translate} from 'react-i18next'
import {ITranslateMixin} from '../types'
import {GameStage} from '../score-input/game-stage'
import styles from './prev-game.css'
import RaisedButton from 'material-ui/RaisedButton'

export interface IPrevGameProps {
  game: PrevGameEntry
  requestDelete: () => void
  requestContinue: () => void
}

export function PrevGameImpl({game, requestDelete, requestContinue, t}: IPrevGameProps & ITranslateMixin) {
  return <div>
    <div>{t('Game on {{date}}', {date: format(game.startTime, 'DD MMM YYYY')})}</div>
    {game.stage === GameStage.ended
      ? <div>{t('Game ended')}</div>
      : <div>{t('Current round: {{round}}', {round: game.currentRound})}</div>}
    {game.stage === GameStage.ended
      ? <div>{t('Time used: {{timeUsed}}', {timeUsed: distanceInWords(game.startTime, game.endTime)})}</div>
      : null}
    <div>{t('Total rounds: {{rounds}}', {rounds: game.rounds})}</div>
    <div className={styles.btnContainer}>
      <RaisedButton label={t('Delete')} primary={true} onClick={requestDelete} />
      <RaisedButton label={t('Continue')} secondary={true} onClick={requestContinue} />
    </div>
  </div>
}

export const PrevGame = translate()(PrevGameImpl)
