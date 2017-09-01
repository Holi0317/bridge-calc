import * as React from 'react'
import {PlayerEditor} from './player-editor'
import {MakerEditor} from './maker-editor'
import grid from '../../styles/grid.css'

export function Settings() {
  return (
    <div className={grid.container}>
      <PlayerEditor />
      <hr />
      <MakerEditor />
    </div>
  )
}
