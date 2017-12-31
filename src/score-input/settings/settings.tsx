import * as React from 'react'
import {Container} from 'react-grid-system'
import {NameEdit} from './name-edit'
import {RoundManagement} from './round-management'
import {SettingsInitializer} from './settings-initializer'
import {SettingsRedirect} from './settings-redirect'
import {ChangeMaker} from './change-maker'

export function Settings() {
  return (
    <Container>
      <NameEdit />
      <ChangeMaker />
      <RoundManagement />
      <SettingsInitializer />
      <SettingsRedirect />
    </Container>
  )
}
