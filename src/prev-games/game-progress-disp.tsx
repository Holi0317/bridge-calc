import * as React from 'react'
import {translate} from 'react-i18next'
import LinearProgress from 'material-ui/LinearProgress'
import {green500} from 'material-ui/styles/colors'
import {GameStage} from '../score-input/game-stage'
import {PrevGameEntry} from './types'
import {ITranslateMixin} from '../types'

interface IGameProgressDispProps {
  entry: PrevGameEntry
}

export function GameProgressDispImpl({entry, t}: IGameProgressDispProps & ITranslateMixin) {
  const currentRound = entry.stage === GameStage.ended ? entry.rounds : entry.currentRound
  return <div>
    <LinearProgress mode="determinate" max={entry.rounds}
                    color={entry.stage === GameStage.ended ? green500 : undefined}
                    value={currentRound} />
    <div>{t('Round {{currentRound}} of {{rounds}}', {currentRound, rounds: entry.rounds})}</div>
  </div>
}

export const GameProgressDisp = translate()(GameProgressDispImpl)
