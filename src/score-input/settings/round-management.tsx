import * as React from 'react'
import {translate} from 'react-i18next'
import {ITranslateMixin} from '../../types'
import {MakerEditor} from './maker-editor'
import {SkipRounds} from './skip-rounds'

type RoundManagementProps = ITranslateMixin

export function RoundManagementImpl({t}: RoundManagementProps) {
  return (
    <div>
      <h4>{t('Round mamager')}</h4>
      <MakerEditor />
      <h4>{t('Skip rounds')}</h4>
      <SkipRounds />
    </div>
  )
}

export const RoundManagement = translate()(RoundManagementImpl as any)
