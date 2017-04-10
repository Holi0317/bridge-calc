import {AppBar} from 'react-toolbox/lib/app_bar'
import MdHelp from 'react-icons/lib/md/help'
import MdArrowBack from 'react-icons/lib/md/arrow-back'
import {h} from 'preact'
import {connect} from 'preact-redux'
import {Route} from 'react-router-dom'
import {Menu} from './menu'

/**
 * @param title {string} - Title for app bar
 * @param showBack {boolean} - Should back button be displayed
 * @returns {XML}
 */
function DisconnectedApp({title, showBack}) {
  const backBtn = showBack ? <MdArrowBack /> : null
  const helpBtn = <MdHelp />
  return (
    <div>
      <AppBar
        title={title}
        leftIcon={backBtn}
        rightIcon={helpBtn}
      />
      <Route path='/' component={Menu}/>
    </div>
  )
}

function stateToProps(state) {
  return {
    title: state.ui.title,
    showBack: state.ui.showBack
  }
}

export const App = connect(stateToProps)(DisconnectedApp)
