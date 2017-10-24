import * as React from 'react'
import {LoadingComponentProps} from 'react-loadable'
import {Spinner} from '../material/spinner'
import style from './loading.css'
import {Ouch} from '../error-boundary/ouch'

export function Loading({error, pastDelay}: LoadingComponentProps) {
  if (error) {
    return <Ouch error="Failed to load route." />
  }
  if (pastDelay) {
    return (
      <div className={style.container}>
        <Spinner />
      </div>
    )
  }
  return null
}
