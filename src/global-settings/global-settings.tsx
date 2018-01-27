import * as React from 'react'
import {Container} from 'react-grid-system'
import {LanguageSelector} from './language-selector'
import {PurgeData} from './purge-data'
import {VersionDisplay} from './version-display'

export function GlobalSettings() {
  return (
    <Container>
      <LanguageSelector />
      <PurgeData />
      <VersionDisplay />
    </Container>
  )
}
