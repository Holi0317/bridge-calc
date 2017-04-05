import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Help from 'material-ui/svg-icons/action/help'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import {createElement as h} from 'react'
import {Link} from 'react-router-dom'

export function App() {
  const backBtn = <IconButton><ArrowBack /></IconButton>
  const helpBtn = <IconButton><Help /></IconButton>
  return (
    <AppBar
      title='Title'
      iconElementLeft={backBtn}
      iconElementRight={helpBtn}
    />
  )
}
