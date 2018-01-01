import * as React from 'react'
import {translate} from 'react-i18next'
import {ITranslateMixin} from '../../types'

export function EmptyNamesPlaceholderImpl({t}: ITranslateMixin) {
  return <div>
    {t('You have not played any game yet')}
  </div>
}

export const EmptyNamesPlaceholder = translate()(EmptyNamesPlaceholderImpl)
