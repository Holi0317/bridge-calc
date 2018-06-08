import * as React from 'react'
import {translate} from 'react-i18next'
import LinearProgress from '@material-ui/core/LinearProgress'
import {GameStage} from '../score-input/game-stage'
import {PrevGameEntry} from './types'
import {ITranslateMixin} from '../types'

interface IGameProgressDispProps {
  entry: PrevGameEntry
}

export function GameProgressDispImpl({entry, t}: IGameProgressDispProps & ITranslateMixin) {
  const currentRound = entry.stage === GameStage.ended ? entry.rounds : entry.currentRound
  const percentage = Math.round(currentRound / entry.rounds)

  // FIXME Replace secondary color with green[500]

  return <div>
    <LinearProgress variant="determinate" value={percentage}
                    color={entry.stage === GameStage.ended ? 'secondary' : 'primary'}/>
    <div>{t('Round {{currentRound}} of {{rounds}}', {currentRound, rounds: entry.rounds})}</div>
  </div>
}

export const GameProgressDisp = translate()(GameProgressDispImpl)
