import * as React from 'react'
import {translate} from 'react-i18next'
import {ITranslateMixin} from '../types'

export function createTitle(title: string) {
  const comp = ({t}: ITranslateMixin) => (<span>{t(title)}</span>)
  return translate()(comp)
}
