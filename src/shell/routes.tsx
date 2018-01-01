import * as React from 'react'
import {Location} from 'history'
import {ErrorBoundary} from '../error-boundary'
import {Route, Switch} from 'react-router'
import {routes} from '../app/routes'

interface IRoutesProps {
  location: Location
}

export function Routes({location}: IRoutesProps) {
  // FIXME Add transition
  // Got some issue with transition in production build
  // Ref: 314974f089de50901b6d6422c5b9edc682236104
  return <ErrorBoundary>
    <Switch location={location}>
      {routes.map(({title, name, ...rest}) => (
        <Route key={name} {...rest} />
      ))}
    </Switch>
  </ErrorBoundary>
}
