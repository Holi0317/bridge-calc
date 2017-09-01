import * as React from 'react'
import {Route, withRouter, matchPath} from 'react-router-dom'
import {translate} from 'react-i18next'
import {routes} from './routes'
import {ITranslateMixin} from '../../types'
import {RouteComponentProps} from 'react-router'
import {Tabs, Tab} from 'material-ui/Tabs'

function getActive(pathname: string): number {
  // Create a matches array.
  // If match, it will be marked as 1 in the array. null otherwise
  const matches = routes.map(route => matchPath(pathname, route) && 1)
  return matches.indexOf(1) || 0
}

type LayoutProps = RouteComponentProps<any> & ITranslateMixin

class LayoutImpl extends React.Component {
  public props: LayoutProps
  public state: {
    active: number
  }

  constructor(props: LayoutProps) {
    super(props)
    this._setActive(props.location.pathname)
  }

  public componentWillReceiveProps(nextProps: LayoutProps) {
    if (nextProps.location !== this.props.location) {
      this._setActive(nextProps.location.pathname)
    }
  }

  public render() {
    const {t} = this.props
    const {active} = this.state
    return (
      <div>
        <Tabs value={active}>
          {routes.map((route, index) => (
            <Tab key={index} value={index} onClick={this._createClickCB(route.path)}>{t(route.name)}</Tab>
          ))}
        </Tabs>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} component={route.component} exact={route.exact} />
        ))}
      </div>
    )
  }

  private _createClickCB(to: string) {
    const {history} = this.props
    return () => {
      history.push(to)
    }
  }

  private _setActive(pathname: string) {
    this.setState(() => ({
      active: getActive(pathname)
    }))
  }
}

export const Layout = withRouter(translate()(LayoutImpl))
