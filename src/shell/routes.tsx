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
  // `/score-input` route has its own transition/animation logic.
  // Blacklisting it from general transition
  const transitionDisabled = location.pathname.startsWith('/score-input')
  return <ErrorBoundary>
    <TransitionGroup exit={false} enter={!transitionDisabled}>
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
