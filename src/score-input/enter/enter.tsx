import * as React from 'react'
import {Container} from 'react-grid-system'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import {UsedTimeDisplay} from './used-time-display'
import {StackInput} from './stack-input'
import {ActionButtons} from './action-buttons'
import {MiniScoreboard} from './mini-scoreboard'
import style from './enter.pcss'
import {ProtectedView} from '../protected-view'

export function EnterImpl() {
  return (
    <Container>
      <UsedTimeDisplay />

      <Paper className={style.actionContainer}>
        <StackInput />
        <Divider />
        <ActionButtons />
      </Paper>

      <MiniScoreboard />
    </Container>
  )
}

export function Enter() {
  return <ProtectedView comp={EnterImpl} />
}
