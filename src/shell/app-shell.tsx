import * as React from 'react'
import {withRouter} from 'react-router-dom'
import {RouteComponentProps} from 'react-router'
import {History} from 'history'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ActionHelp from 'material-ui/svg-icons/action/help'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import {ToastSingleton} from '../toast-singleton'
import {Titles} from './titles'
import {SWReg} from '../sw-reg'
import {Migration} from '../migration/migration'
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

export function ShellImpl({location, history}: AppProps) {
  const helpBtn = <IconButton aria-label="Help" rel="noopener" target="_blank"
                              href="https://gitlab.com/holi0317/bridge-calc/blob/master/docs/en.md">
    <ActionHelp width="24px" height="24px" />
  </IconButton>
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
      <main>
        <Routes location={location} />
      </main>
      <Migration />
      <ToastSingleton />
      <SWReg />
    </div>
  )
}

export const Shell = withRouter(ShellImpl)
