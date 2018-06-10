import * as React from 'react'
import {Container} from 'react-grid-system'
import {NameEdit} from './name-edit'
import {RoundManagement} from './round-management'
import {SettingsInitializer} from './settings-initializer'
import {ChangeMaker} from './change-maker'
import {ProtectedView} from '../protected-view'

export function SettingsImpl() {
  return (
    <Container>
      <NameEdit />
      <ChangeMaker />
      <RoundManagement />

      <SettingsInitializer />
    </Container>
  )
}

export function Settings() {
  return <ProtectedView comp={SettingsImpl} />
}
