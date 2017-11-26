import * as React from 'react'
import {Container} from 'react-grid-system'
import {PlayerEditor} from './player-editor'
import {RoundManagement} from './round-management'

export function Settings() {
  return (
    <Container>
      <PlayerEditor />
      <hr />
      <RoundManagement />
    </Container>
  )
}
