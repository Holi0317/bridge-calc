import * as React from 'react'
import {withRouter} from 'react-router-dom'
import {RouteComponentProps} from 'react-router'
import {History} from 'history'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ActionHelp from 'material-ui/svg-icons/action/help'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import {Titles} from './titles'
import {SWReg} from '../sw-reg'
import {Routes} from './routes'

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

type AppProps = RouteComponentProps<any>

/**
 * @param location {Location} - Location object injected by react-router
 * @param history {History} - History object injected by react-router
 */
export function ShellImpl({location, history}: AppProps) {
  const helpBtn = <IconButton><ActionHelp width="24px" height="24px" /></IconButton>
  const backFn = to(history, '/')
  const backBtn = <IconButton><NavigationArrowBack width="24px" height="24px" /></IconButton>
  return (
    <div>
      <AppBar
        iconElementRight={helpBtn}
        iconElementLeft={backBtn}
        showMenuIconButton={location.pathname !== '/'}
        onLeftIconButtonClick={backFn}
        title={<Titles />}
      />
      <Routes location={location} />
      <SWReg />
    </div>
  )
}

export const Shell = withRouter(ShellImpl)
