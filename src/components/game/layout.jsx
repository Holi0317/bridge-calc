// @flow
import {h, Component} from 'preact'
import {Route, withRouter, matchPath} from 'react-router-dom'
import {translate} from 'react-i18next'
import Tabs from 'preact-material-components/Tabs/Tabs'
import {routes} from './routes'

import type {WithRouterProps} from 'react-router-dom'
import type {T} from '../../types'

function getActive(pathname: string): number {
  // Create a matches array.
  // If match, it will be marked as 1 in the array. null otherwise
  const matches = routes.map(route => matchPath(pathname, route) && 1)
  return matches.indexOf(1) || 0
}

class DisconnectedLayout extends Component {
  props: WithRouterProps & {
    t: T
  }
  state: {
    active: number
  }

  constructor(props) {
    super(props)
    this._setActive(props.location.pathname)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this._setActive(nextProps.location.pathname)
    }
  }

  _createClickCB(to: string) {
    const {history} = this.props
    return () => {
      history.push(to)
    }
  }

  _setActive(pathname: string) {
    this.setState(() => ({
      active: getActive(pathname)
    }))
  }

  render() {
    const {t} = this.props
    const {active} = this.state
    return (
      <div>
        <Tabs indicator-accent={true}>
          {routes.map((route, index) => (
            <Tabs.Tab key={index} active={index === active} onClick={this._createClickCB(route.path)}>{t(route.name)}</Tabs.Tab>
          ))}
        </Tabs>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} component={route.component} exact={route.exact} />
        ))}
      </div>
    )
  }
}

export const Layout = withRouter(translate()(DisconnectedLayout))
