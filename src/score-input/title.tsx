import * as React from 'react'
import {Route} from 'react-router-dom'
import {routes} from './routes'

export function GameTitle() {
  return (
    <span>
      {routes.map(route => (
        <Route key={route.name} exact={route.exact} path={route.path} component={route.title} />
      ))}
    </span>
  )
}
