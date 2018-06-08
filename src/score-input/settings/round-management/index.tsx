import * as React from 'react'
import {translate} from 'react-i18next'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import {SkipRounds} from './skip-rounds'
import {ITranslateMixin} from '../../../types'
import style from '../settings.css'

export function RoundManagementImpl({t}: ITranslateMixin) {
  // FIXME Click CardHeader should make component expand
  return <Card className={style.sessionCard}>
    <CardHeader title={t('Skip rounds')}/>
    <CardContent>
      <SkipRounds />
    </CardContent>
  </Card>
}

export const RoundManagement = translate()(RoundManagementImpl)
