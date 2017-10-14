import * as React from 'react'
import {PlayerEditor} from './player-editor'
import {RoundManagement} from './round-management'
import grid from '../../styles/grid.css'

export function Settings() {
  return (
    <div className={grid.container}>
      <PlayerEditor />
      <hr />
      <RoundManagement />
    </div>
  )
}
