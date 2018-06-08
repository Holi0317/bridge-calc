import * as React from 'react'
import * as format from 'date-fns/format'
import * as distanceInWords from 'date-fns/distance_in_words'
import {PrevGameEntry} from './types'
import {translate} from 'react-i18next'
import {ITranslateMixin} from '../types'
import {GameStage} from '../score-input/game-stage'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import {GameProgressDisp} from './game-progress-disp'

export interface IPrevGameProps extends ITranslateMixin {
  className?: string
  game: PrevGameEntry
  requestDelete(): void
  requestContinue(): void
}

export class PrevGameImpl extends React.Component<IPrevGameProps> {
  public state = {
    collapsed: false
  }

  render() {
    // FIXME Click CardHeader should make component expand
    const {className, game, requestDelete, requestContinue, t} = this.props
    const {collapsed} = this.state

    return <Card className={className}>
      <CardHeader
        title={t('Game on {{date}}', {date: format(game.startTime, 'DD MMM YYYY')})}
        subheader={t('With {{players}}', {players: Object.values(game.names).join(', ')})}
      />

      <CardActions>
        <Button onClick={requestDelete}>{t('Delete')}</Button>
        <Button color="primary" onClick={requestContinue}>{t('Delete')}</Button>
      </CardActions>

      <Collapse in={collapsed} timeout="auto" unmountOnExit>
        <CardContent>
          <div>
            <GameProgressDisp entry={game}/>
            {game.stage === GameStage.ended
              ? <div>{t('Time used: {{timeUsed}}', {timeUsed: distanceInWords(game.startTime, game.endTime)})}</div>
              : null}
          </div>
        </CardContent>
      </Collapse>
    </Card>
  }
}

export const PrevGame = translate()(PrevGameImpl)
