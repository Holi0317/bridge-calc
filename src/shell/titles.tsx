import * as React from 'react'
import {Route, Switch} from 'react-router-dom'
import {routes} from '../app/routes'

export function Titles() {
  return (
    <span>
      <Switch>
        {/* tslint:disable-next-line: no-unused-variable */}
        {routes.map(({title, name, component, ...rest}) => (
          <Route key={name} component={title} {...rest} />
        ))}
      </Switch>
    </span>
  )
}
