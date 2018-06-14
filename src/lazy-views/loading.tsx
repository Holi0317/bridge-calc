import * as React from 'react'
import * as Loadable from 'react-loadable'
import {Spinner} from '../material/spinner'
import style from './loading.pcss'
import {Ouch} from '../error-boundary/ouch'

export function Loading({error, pastDelay}: Loadable.LoadingComponentProps) {
  if (error) {
    console.error(error)
    return <Ouch error={new Error('Failed to load route.')} />
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
