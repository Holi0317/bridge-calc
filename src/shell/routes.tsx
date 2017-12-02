import * as React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {Location} from 'history'
import {ErrorBoundary} from '../error-boundary'
import {Route, Switch} from 'react-router'
import {routes} from '../app/routes'
import styles from './route-transitions.css'

const transitionClass = {
  appear: styles.appear,
  appearActive: styles.appearActive,
  enter: styles.enter,
  enterActive: styles.enterActive
}

interface IRoutesProps {
  location: Location
}

export function Routes({location}: IRoutesProps) {
  return <ErrorBoundary>
    <TransitionGroup exit={false}>
      <CSSTransition classNames={transitionClass} key={location.key} timeout={300} appear>
        <div className={styles.base}>
          <Switch location={location}>
            {routes.map(({title, name, ...rest}) => (
              <Route key={name} {...rest} />
            ))}
          </Switch>
        </div>
      </CSSTransition>
    </TransitionGroup>
  </ErrorBoundary>
}
