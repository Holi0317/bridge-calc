import * as React from 'react'
import {Route} from 'react-router-dom'
import {routes} from '../app/routes'

export function Titles() {
  return (
    <span>
      {routes.map(({title, name, component, ...rest}) => (
        <Route key={name} component={title} {...rest} />
      ))}
    </span>
  )
}
