// @flow
import {h} from 'preact'
import {Route} from 'react-router-dom'
import {routes} from './routes'

export function GameTitle() {
  return (
    <span>
      {routes.map(route => (
        <Route exact={route.exact} path={route.path} component={route.titleComponent} />
      ))}
    </span>
  )
}
