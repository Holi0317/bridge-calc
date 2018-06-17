import * as React from 'react'
import {Container} from '../material/container'
import {LanguageSelector} from './language-selector'
import {PurgeData} from './purge-data'
import {VersionDisplay} from './version-display'
import {ThemeSelection} from './theme-selection'

export function GlobalSettings() {
  return (
    <Container>
      <ThemeSelection />
      <LanguageSelector />
      <PurgeData />
      <VersionDisplay />
    </Container>
  )
}
