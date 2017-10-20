import * as React from 'react'
import {translate} from 'react-i18next'
import {ITranslateMixin} from '../types'

// This variable is injected by webpack. I'm just lazy
declare const VERSION: string

export function VersionDisplayImpl({t}: ITranslateMixin) {
  return (
    <div>
      {t('Version: {{version}}', {version: VERSION})}
    </div>
  )
}

export const VersionDisplay = translate()(VersionDisplayImpl as any)
