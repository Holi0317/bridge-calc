import * as React from 'react'
import {translate} from 'react-i18next'
import {ITranslateMixin} from '../types'
import Typography from '@material-ui/core/Typography'
import style from './version-display.pcss'

// Variables is injected by webpack
declare const VERSION: string
declare const HASH: string

export function VersionDisplayImpl({t}: ITranslateMixin) {
  return (
    <div className={style.text}>
      <Typography variant="caption">
        {t('Version: {{version}}', {version: `${VERSION}-${HASH}`})}
      </Typography>
    </div>
  )
}

export const VersionDisplay = translate()(VersionDisplayImpl)
