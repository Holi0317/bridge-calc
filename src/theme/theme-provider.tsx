import * as React from 'react'
import {connect} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {activatedThemeSelector} from './selectors/activated-theme'
import {$call, IRootState} from '../types'

const mapStateToProps = (state: IRootState) => ({
  theme: activatedThemeSelector(state),
})

const stateType = $call(mapStateToProps)

class ThemeProviderImpl extends React.Component {
  public props: typeof stateType & {children: React.ReactNode}

  public render() {
    if (document.body) {
      document.body.style.setProperty('--bg-color', this.props.theme.backgroundColor)
    }
    return <MuiThemeProvider muiTheme={this.props.theme.mui}>
      {this.props.children}
    </MuiThemeProvider>
  }
}

export const ThemeProvider = connect(mapStateToProps)(ThemeProviderImpl)
