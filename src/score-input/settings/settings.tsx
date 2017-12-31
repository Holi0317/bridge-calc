import * as React from 'react'
import {Container} from 'react-grid-system'
import {PlayerEditor} from './player-editor'
import {RoundManagement} from './round-management'
import {SettingsInitializer} from './settings-initializer'

export function Settings() {
  return (
    <Container>
      <PlayerEditor />
      <hr />
      <RoundManagement />
      <SettingsInitializer />
    </Container>
  )
}
