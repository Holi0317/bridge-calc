// @flow
import {h} from 'preact'
import {connect} from 'preact-redux'
import {Route, withRouter, Redirect} from 'react-router-dom'
import {AppBar} from 'react-toolbox/components/app_bar'
import MdHelp from 'react-icons/md/help'
import MdArrowBack from 'react-icons/md/arrow-back'
import {Titles} from './titles'
import {Menu} from './menu'
import {Entry} from './entry'
import {Layout} from './game/layout'

import type {RootState} from '../types'

/**
 * Create a function that will route to specified location.
 * Think of this as the Link component in react-router. But in function form.
 * @param history {History} - History object from react-router
 * @param loc {string} - Path of the desired location
 * @returns {function()} - Function to redirect to the location above
 */
function to(history, loc) {
  return () => history.push(loc)
}

/**
 * @param gameRedirect {boolean} - Should /game route be redirected?
 * @param location {Location} - Location object injected by react-router
 * @param history {History} - History object injected by react-router
 * @returns {XML}
 */
function DisconnectedApp({gameRedirect, location, history}) {
  const helpBtn = <MdHelp />
  const backBtn = location.pathname === '/' ? null : <MdArrowBack />
  const backFn = to(history, '/')
  return (
    <div>
      <AppBar
        title={<Titles />}
        leftIcon={backBtn}
        onLeftIconClick={backFn}
        rightIcon={helpBtn}
      />
      <Route exact path="/" component={Menu} />
      <Route path="/entry" component={Entry} />
      <Route path="/game" render={() => (
        gameRedirect ? <Redirect to="/entry" /> : <Layout />
      )} />
    </div>

  )
}

function stateToProps(state: RootState) {
  return {
    gameRedirect: state.currentGame == null
  }
}

export const App = withRouter(connect(stateToProps)(DisconnectedApp))
