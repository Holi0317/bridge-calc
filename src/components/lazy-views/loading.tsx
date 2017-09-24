import * as React from 'react'
import {Spinner} from '../../material/spinner'
import style from './loading.css'

export function Loading() {
  return (
    <div className={style.container}>
      <Spinner />
    </div>
  )
}
