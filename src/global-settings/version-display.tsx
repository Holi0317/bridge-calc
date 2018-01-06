import * as React from 'react'
import {translate} from 'react-i18next'
import {ITranslateMixin} from '../types'

// Variables is injected by webpack
declare const VERSION: string
declare const HASH: string

export function VersionDisplayImpl({t}: ITranslateMixin) {
  return (
    <div>
      {t('Version: {{version}}', {version: `${VERSION}-${HASH}`})}
    </div>
  )
}

export const VersionDisplay = translate()(VersionDisplayImpl)
