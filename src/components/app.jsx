// @flow
import {AppBar} from 'react-toolbox/components/app_bar'
import MdHelp from 'react-icons/md/help'
import {h} from 'preact'
import {connect} from 'preact-redux'
import {Route, withRouter} from 'react-router-dom'
import MdArrowBack from 'react-icons/md/arrow-back'
import {Menu} from './menu'
import {Entry} from './entry'
import {Layout} from './game/layout'

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
 * @param title {string} - Title for app bar
 * @param location {Location} - Location object injected by react-router
 * @param history {History} - History object injected by react-router
 * @returns {XML}
 */
function DisconnectedApp({title, location, history}) {
  const helpBtn = <MdHelp />
  const backBtn = location.pathname === '/' ? null : <MdArrowBack />
  const backFn = to(history, '/')
  return (
    <div>
      <AppBar
        title={title}
        leftIcon={backBtn}
        onLeftIconClick={backFn}
        rightIcon={helpBtn}
      />
      <Route exact path="/" component={Menu} />
      <Route path="/entry" component={Entry} />
      <Route path="/game" component={Layout} />
    </div>

  )
}

function stateToProps(state) {
  return {
    title: state.ui.appBar.title
  }
}

export const App = withRouter(connect(stateToProps)(DisconnectedApp))
