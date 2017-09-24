import * as React from 'react'
import {translate} from 'react-i18next'
import {ITranslateMixin} from '../types'

export function titleAugment(title: string | React.ComponentType<any>) {
  if (typeof title !== 'string') {
    return title
  }
  const comp = ({t}: ITranslateMixin) => (<span>{t(title)}</span>)
  return translate()(comp as any)
}
