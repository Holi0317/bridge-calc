import * as React from 'react'
import * as format from 'date-fns/format'
import * as distanceInWords from 'date-fns/distance_in_words'
import {PrevGameEntry} from './types'
import {translate} from 'react-i18next'
import {ITranslateMixin} from '../types'
import {GameStage} from '../score-input/game-stage'
import Card, {CardActions, CardText, CardHeader} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import {GameProgressDisp} from './game-progress-disp'

export interface IPrevGameProps {
  className?: string
  game: PrevGameEntry
  requestDelete(): void
  requestContinue(): void
}

export function PrevGameImpl({className, game, requestDelete, requestContinue, t}: IPrevGameProps & ITranslateMixin) {
  return <Card className={className}>
    <CardHeader
      title={t('Game on {{date}}', {date: format(game.startTime, 'DD MMM YYYY')})}
      subtitle={t('With {{players}}', {players: Object.values(game.names).join(', ')})}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardActions>
      <FlatButton label={t('Delete')} onClick={requestDelete} />
      <FlatButton label={t('Continue')} primary={true} onClick={requestContinue} />
    </CardActions>
    <CardText expandable={true}>
      <div>
        <GameProgressDisp entry={game} />
        {game.stage === GameStage.ended
          ? <div>{t('Time used: {{timeUsed}}', {timeUsed: distanceInWords(game.startTime, game.endTime)})}</div>
          : null}
      </div>
    </CardText>
  </Card>
}

export const PrevGame = translate()(PrevGameImpl)
