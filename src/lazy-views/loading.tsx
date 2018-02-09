import * as React from 'react'
import {Spinner} from '../material/spinner'
import style from './loading.css'
import {Ouch} from '../error-boundary/ouch'

// LoadableExport is the namespace for react-loadable
export function Loading({error, pastDelay}: LoadableExport.LoadingComponentProps) {
  if (error) {
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
