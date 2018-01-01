import * as React from 'react'
import {translate} from 'react-i18next'
import Card, {CardHeader, CardText} from 'material-ui/Card'
import {SkipRounds} from './skip-rounds'
import {ITranslateMixin} from '../../../types'
import style from '../settings.css'

export function RoundManagementImpl({t}: ITranslateMixin) {
  return <Card className={style.sessionCard}>
    <CardHeader
      title={t('Skip rounds')}
      actAsExpander={false}
      showExpandableButton={false}
    />
    <CardText>
      <SkipRounds />
    </CardText>
  </Card>
}

export const RoundManagement = translate()(RoundManagementImpl)
