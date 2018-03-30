import * as React from 'react'
import {connect} from 'react-redux'
import {activatedThemeSelector} from './selectors/activated-theme'
import {$call, IRootState} from '../types'

const mapStateToProps = (state: IRootState) => ({
  theme: activatedThemeSelector(state)
})

const stateType = $call(mapStateToProps)

class ThemeProviderImpl extends React.Component {
  public props: typeof stateType
}

export const ThemeProvider = connect(mapStateToProps)(ThemeProviderImpl)
