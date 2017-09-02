import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {connect} from 'react-redux'
import {returntypeof} from 'react-redux-typescript'
import {Route, withRouter, Redirect} from 'react-router-dom'
import {RouteComponentProps} from 'react-router'
import {History} from 'history'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ActionHelp from 'material-ui/svg-icons/action/help'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import {Titles} from './titles'
import {Menu} from './lazy-views/menu'
import {Entry} from './lazy-views/entry'
import {Layout} from './lazy-views/game-layout'
import {IRootState} from '../types'

/**
 * Create a function that will route to specified location.
 * Think of this as the Link component in react-router. But in function form.
 * @param history {History} - History object from react-router
 * @param loc {string} - Path of the desired location
 * @returns {function()} - Function to redirect to the location above
 */
function to(history: History, loc: string) {
  return () => history.push(loc)
}

const mapStateToProps = (state: IRootState) => ({
  gameRedirect: state.currentGame == null
})

const stateType = returntypeof(mapStateToProps)

type AppProps = typeof stateType & RouteComponentProps<any>

/**
 * @param gameRedirect {boolean} - Should /game route be redirected?
 * @param location {Location} - Location object injected by react-router
 * @param history {History} - History object injected by react-router
 */
function AppImpl({gameRedirect, location, history}: AppProps) {
  const helpBtn = <IconButton><ActionHelp width="24px" height="24px" /></IconButton>
  const backFn = to(history, '/')
  const backBtn = <IconButton><NavigationArrowBack width="24px" height="24px" /></IconButton>
  return (
    <div>
      <AppBar
        iconElementRight={helpBtn}
        iconElementLeft={backBtn}
        showMenuIconButton={location.pathname !== '/'}
        onLeftIconButtonTouchTap={backFn}
        title={<Titles />}
      />

      <Route exact path="/" component={Menu} />
      <Route path="/entry" component={Entry} />
      <Route path="/game" render={() => (
        gameRedirect ? <Redirect to="/entry" /> : <Layout />
      )} />
    </div>
  )
}

export const App = flowRight(
  withRouter,
  connect(mapStateToProps)
)(AppImpl)
