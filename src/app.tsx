import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Help from 'material-ui/svg-icons/action/help'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import {createElement as h} from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import {Menu} from './menu'
import {IState} from './reducer/index'

export interface IAppProps {
  title: string
  showBack: boolean
}

const emptyBtnStyle = {
  width: '48px',
  height: '48px'
}

function DisconnectedApp({title, showBack}: IAppProps) {
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

function stateToProps(state: IState): IAppProps {
  return {
    title:  state.ui.title,
    showBack: state.ui.showBack
  }
}

export const App = connect(stateToProps)(DisconnectedApp)
