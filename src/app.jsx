import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Help from 'material-ui/svg-icons/action/help'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import {h} from 'preact'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import {Menu} from './menu'

const emptyBtnStyle = {
  width: '48px',
  height: '48px'
}

/**
 * @param title {string} - Title for app bar
 * @param showBack {boolean} - Should back button be displayed
 * @returns {XML}
 */
function DisconnectedApp({title, showBack}) {
  const backBtn = showBack ? <IconButton><ArrowBack /></IconButton> : <div style={emptyBtnStyle} />
  const helpBtn = <IconButton><Help /></IconButton>
  return (
    <div>
      <AppBar
        title={title}
        iconElementLeft={backBtn}
        iconElementRight={helpBtn}
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
