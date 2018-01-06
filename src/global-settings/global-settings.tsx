import * as React from 'react'
import {translate} from 'react-i18next'
import {Container} from 'react-grid-system'
import {LanguageSelector} from './language-selector'
import {PurgeData} from './purge-data'
import {VersionDisplay} from './version-display'
import {ITranslateMixin} from '../types'

type GlobalSettingsProps = ITranslateMixin

export function GlobalSettingsImpl({t}: GlobalSettingsProps) {
  return (
    <Container>
      <LanguageSelector />
      <PurgeData />
      <VersionDisplay />
    </Container>
  )
}

export const GlobalSettings = translate()(GlobalSettingsImpl)
