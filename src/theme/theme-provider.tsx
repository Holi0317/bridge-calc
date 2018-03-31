import * as React from 'react'
import {connect} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {activatedThemeSelector} from './selectors/activated-theme'
import {cssPropsSelector} from './selectors/css-props'
import {$call, IRootState} from '../types'

const mapStateToProps = (state: IRootState) => ({
  theme: activatedThemeSelector(state),
  cssProps: cssPropsSelector(state)
})

const stateType = $call(mapStateToProps)

type ThemeProviderProps = typeof stateType & {children: React.ReactNode}

export function ThemeProviderImpl({theme, cssProps, children}: ThemeProviderProps) {
  cssProps.forEach((value, key) => {
    document.body.style.setProperty(key, value)
  })

  return <MuiThemeProvider muiTheme={theme}>
    {children}
  </MuiThemeProvider>
}

export const ThemeProvider = connect(mapStateToProps)(ThemeProviderImpl)
