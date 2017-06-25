// @flow
import {h} from 'preact'
import {PlayerEditor} from './player-editor'
import grid from '../../styles/grid.css'

export function Settings() {
  return (
    <div className={grid.container}>
      <PlayerEditor />
    </div>
  )
}
