import {AppBar} from 'react-toolbox/components/app_bar'
import MdHelp from 'react-icons/md/help'
import {h} from 'preact'
import {connect} from 'preact-redux'
import {Route, withRouter} from 'react-router-dom'
import MdArrowBack from 'react-icons/md/arrow-back'
import {Menu} from './menu'
import {Entry} from './entry'

/**
 * @param title {string} - Title for app bar
 * @returns {XML}
 */
function DisconnectedApp({title, location}) {
  const helpBtn = <MdHelp />
  const backBtn = location.pathname === '/' ? null : <MdArrowBack />
  return (
    <div>
      <AppBar
        title={title}
        leftIcon={backBtn}
        rightIcon={helpBtn}
      />
      <Route exact path='/' component={Menu}/>
      <Route path="/entry" component={Entry}/>
    </div>

  )
}

function stateToProps(state) {
  return {
    title: state.ui.title
  }
}

export const App = withRouter(connect(stateToProps)(DisconnectedApp))
