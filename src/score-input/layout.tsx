import * as React from 'react'
import {Route, withRouter, matchPath} from 'react-router-dom'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {routes} from './routes'
import {ITranslateMixin} from '../types'
import {RouteComponentProps} from 'react-router'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Paper from '@material-ui/core/Paper'
import {ErrorBoundary} from '../error-boundary'

function getActive(pathname: string): number {
  // Create a matches array.
  // If match, it will be marked as 1 in the array. null otherwise
  const index = routes.findIndex(route => matchPath(pathname, route) != null)
  return index === -1 ? 0 : index
}

type LayoutProps = RouteComponentProps<any> & ITranslateMixin

export class LayoutImpl extends React.Component {
  public props: LayoutProps
  public state: {
    active: number
  }

  public componentWillMount() {
    this.setActive(this.props.location.pathname)
  }

  public componentWillReceiveProps(nextProps: LayoutProps) {
    if (nextProps.location !== this.props.location) {
      this.setActive(nextProps.location.pathname)
    }
  }

  public render() {
    const {t} = this.props
    const {active} = this.state

    return (
      <div>
        <Paper>
          <Tabs value={active} onChange={this.tabChange} indicatorColor="primary"
                textColor="primary"
                centered>
            {routes.map((route, index) => (
              <Tab key={index} label={t(route.name)} value={index} />
            ))}
          </Tabs>
        </Paper>
        <ErrorBoundary>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} component={route.component} exact={route.exact} />
          ))}
        </ErrorBoundary>
      </div>
    )
  }

  private tabChange = (_event: any, routeIndex: number) => {
    const {path} = routes[routeIndex]
    if (path) {
      this.props.history.push(path)
    }
  }

  private setActive(pathname: string) {
    this.setState(() => ({
      active: getActive(pathname)
    }))
  }
}

export const Layout = flowRight(
  withRouter,
  translate()
)(LayoutImpl)
