// @flow
import {h} from 'preact'
import {PlayerEditor} from './player-editor'
import grid from '../../styles/grid.css'
import {MakerEditor} from './maker-editor'

export function Settings() {
  return (
    <div className={grid.container}>
      <PlayerEditor />
      <hr />
      <MakerEditor />
    </div>
  )
}
