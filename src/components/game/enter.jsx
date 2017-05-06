// @flow
import {h} from 'preact'
import {UsedTimeDisplay} from './used-time-display'
import {StackInput} from './stack-input'
import {ActionButtons} from './action-buttons'
import style from './enter.css'

export function Enter() {
  return (
    <div className="container">
      <UsedTimeDisplay />
      <div className={style.actionContainer}>
        <StackInput />
        <ActionButtons />
      </div>
    </div>
  )
}
