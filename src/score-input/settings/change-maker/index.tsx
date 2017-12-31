import * as React from 'react'
import {translate} from 'react-i18next'
import {default as Card, CardHeader, CardText} from 'material-ui/Card'
import {ITranslateMixin} from '../../../types'
import {MakerEditor} from './maker-editor'
import style from '../settings.css'

export function ChangeMakerImpl({t}: ITranslateMixin) {
  return <Card className={style.sessionCard}>
    <CardHeader
      title={t('Change maker')}
      actAsExpander={false}
      showExpandableButton={false}
    />
    <CardText>
      <MakerEditor />
    </CardText>
  </Card>
}

export const ChangeMaker = translate()(ChangeMakerImpl)
