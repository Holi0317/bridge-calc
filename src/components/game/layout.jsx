// @flow
import {h, Component} from 'preact'
import {Route, withRouter, matchPath} from 'react-router-dom'
import {translate} from 'react-i18next'
import {Tabs, Tab} from 'react-toolbox/components/tabs'
import {routes} from './routes'

import type {WithRouterProps} from 'react-router-dom'
import type {T} from '../../i18n'

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
  // Only compute tabs once as it will not change and there is cost for binding onClick handler
  _tabs: Tab[]

  constructor(props) {
    super(props)
    const {t, location} = props
    this._tabs = routes.map((route, index) => (
      <Tab key={index} to={route.path} exact={route.exact} label={t(route.name)} onClick={this._createClickCB(route.path)} />
    ))
    this._setActive(location.pathname)
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
    const {active} = this.state
    return (
      <div>
        <Tabs index={active} fixed>
          {this._tabs}
        </Tabs>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} component={route.component} exact={route.exact} />
        ))}
      </div>
    )
  }
}

export const Layout = withRouter(translate()(DisconnectedLayout))
