import * as React from 'react'
import {translate} from 'react-i18next'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import {ITranslateMixin} from '../../../types'
import {MakerEditor} from './maker-editor'
import style from '../settings.css'

export function ChangeMakerImpl({t}: ITranslateMixin) {
  // FIXME CardHeader should expand the card and the card should be a collapse
  return <Card className={style.sessionCard}>
    {/* FIXME Regression: Card header title is too large */}
    <CardHeader title={t('Change maker')}/>
    <CardContent>
      <MakerEditor />
    </CardContent>
  </Card>
}

export const ChangeMaker = translate()(ChangeMakerImpl)
