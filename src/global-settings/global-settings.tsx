import * as React from 'react'
import {translate} from 'react-i18next'
import {Grid} from 'react-flexbox-grid'
import {LanguageSelector} from './language-selector'
import {PurgeData} from './purge-data'
import {VersionDisplay} from './version-display'
import {ITranslateMixin} from '../types'

type GlobalSettingsProps = ITranslateMixin

export function GlobalSettingsImpl({t}: GlobalSettingsProps) {
  return (
    <Grid>
      <LanguageSelector />
      <PurgeData />
      <VersionDisplay />
    </Grid>
  )
}

export const GlobalSettings = translate()(GlobalSettingsImpl as any)
