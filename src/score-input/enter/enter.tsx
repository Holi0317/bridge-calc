import * as React from 'react'
import {UsedTimeDisplay} from './used-time-display'
import {StackInput} from './stack-input'
import {ActionButtons} from './action-buttons'
import {MiniScoreboard} from './mini-scoreboard'
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

      <MiniScoreboard />
    </div>
  )
}
