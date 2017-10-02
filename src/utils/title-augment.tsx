import * as React from 'react'
import {ITranslateMixin} from '../types'
import {translate} from 'react-i18next'

export function titleAugment(title: string) {
  const comp = ({t}: ITranslateMixin) => (<span>{t(title)}</span>)
  return translate()(comp as any)
}
