import * as React from 'react'
import {Grid} from 'react-flexbox-grid'
import {PlayerEditor} from './player-editor'
import {RoundManagement} from './round-management'

export function Settings() {
  return (
    <Grid>
      <PlayerEditor />
      <hr />
      <RoundManagement />
    </Grid>
  )
}
