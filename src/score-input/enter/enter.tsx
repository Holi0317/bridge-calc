import * as React from 'react'
import {Container} from 'react-grid-system'
import {UsedTimeDisplay} from './used-time-display'
import {StackInput} from './stack-input'
import {ActionButtons} from './action-buttons'
import {MiniScoreboard} from './mini-scoreboard'
import style from './enter.css'

export function Enter() {
  return (
    <Container>
      <UsedTimeDisplay />

      <div className={style.actionContainer}>
        <StackInput />
        <ActionButtons />
      </div>

      <MiniScoreboard />
    </Container>
  )
}
