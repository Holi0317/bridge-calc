import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Help from 'material-ui/svg-icons/action/help'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import {createElement as h} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {IState} from './reducer/index'

export interface IAppProps {
  title: string
}

function DisconnectedApp({title}: IAppProps) {
  const backBtn = <IconButton><ArrowBack /></IconButton>
  const helpBtn = <IconButton><Help /></IconButton>
  return (
    <AppBar
      title={title}
      iconElementLeft={backBtn}
      iconElementRight={helpBtn}
    />
  )
}

function stateToProps(state: IState) {
  return {
    title: state.ui.title
  }
}

export const App = connect(stateToProps)(DisconnectedApp)
