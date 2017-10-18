import * as React from 'react'
import {translate} from 'react-i18next'
import {ITranslateMixin} from '../types'

export function NoPrevGamePlaceholderImpl({t}: ITranslateMixin) {
  return null
}

export const NoPrevGamePlaceholder = translate()(NoPrevGamePlaceholderImpl as any)
