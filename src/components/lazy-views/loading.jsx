// @flow
import {h} from 'preact'
import {Spinner} from '../mdc/spinner'
import style from './loading.css'

export function Loading() {
  return (
    <div className={style.container}>
      <Spinner />
    </div>
  )
}
