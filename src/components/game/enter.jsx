// @flow
import {h} from 'preact'
import {UsedTimeDisplay} from './used-time-display'
import {StackInput} from './stack-input'
import {ActionButtons} from './action-buttons'
import style from './enter.css'
import grid from '../../styles/grid.css'

export function Enter() {
  return (
    <div className={grid.container}>
      <UsedTimeDisplay />
      <div className={style.actionContainer}>
        <StackInput />
        <ActionButtons />
      </div>
    </div>
  )
}
