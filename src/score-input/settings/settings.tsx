import * as React from 'react'
import {Container} from 'react-grid-system'
import {NameEdit} from './name-edit'
import {RoundManagement} from './round-management'
import {SettingsInitializer} from './settings-initializer'

export function Settings() {
  return (
    <Container>
      <NameEdit />
      <hr />
      <RoundManagement />
      <SettingsInitializer />
    </Container>
  )
}
