import * as React from 'react'
import {Container} from 'react-grid-system'
import {LanguageSelector} from './language-selector'
import {PurgeData} from './purge-data'
import {VersionDisplay} from './version-display'
import {ThemeSelection} from './theme-selection'

export function GlobalSettings() {
  return (
    <Container>
      {/* FIXME Regression: All components are too close to each other */}
      <ThemeSelection />
      <LanguageSelector />
      <PurgeData />
      <VersionDisplay />
    </Container>
  )
}
