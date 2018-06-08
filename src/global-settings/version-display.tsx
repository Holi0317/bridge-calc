import * as React from 'react'
import {translate} from 'react-i18next'
import {ITranslateMixin} from '../types'
import style from './version-display.css'

// Variables is injected by webpack
declare const VERSION: string
declare const HASH: string

export function VersionDisplayImpl({t}: ITranslateMixin) {
  // TODO Make the text secondary
  return (
    <div className={style.text}>
      {t('Version: {{version}}', {version: `${VERSION}-${HASH}`})}
    </div>
  )
}

export const VersionDisplay = translate()(VersionDisplayImpl)
