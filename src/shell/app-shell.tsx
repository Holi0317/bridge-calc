import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {withRouter} from 'react-router-dom'
import {translate} from 'react-i18next'
import {RouteComponentProps} from 'react-router'
import {History} from 'history'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import ActionHelp from '@material-ui/icons/Help'
import NavigationArrowBack from '@material-ui/icons/ArrowBack'
import {ToastSingleton} from '../toast-singleton'
import {Titles} from './titles'
import {SWReg} from '../sw-reg'
import {Migration} from '../migration/migration'
import {Routes} from './routes'
import {ITranslateMixin} from '../types'

/**
 * Create a function that will route to specified location.
 * Think of this as the Link component in react-router. But in function form.
 * @param history - History object from react-router
 * @param loc - Path of the desired location
 * @returns - Function to redirect to the location above
 */
function to(history: History, loc: string) {
  return () => history.push(loc)
}

type AppProps = RouteComponentProps<any> & ITranslateMixin

export function ShellImpl({location, history, t}: AppProps) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {location.pathname !== '/' && (
            <Tooltip title={t('Back to menu')}>
              <IconButton onClick={to(history, '/')}>
                <NavigationArrowBack width="24px" height="24px" />
              </IconButton>
            </Tooltip>
          )}

          <Typography variant="title" color="inherit">
            <Titles />
          </Typography>

          <Tooltip title={t('Help')}>
            <IconButton rel="noopener" target="_blank"
                        href="https://gitlab.com/holi0317/bridge-calc/blob/master/docs/en.md">
              <ActionHelp width="24px" height="24px" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <main>
        <Routes location={location} />
      </main>

      <Migration />
      <ToastSingleton />
      <SWReg />
    </div>
  )
}

export const Shell = flowRight(
  withRouter,
  translate()
)(ShellImpl)
