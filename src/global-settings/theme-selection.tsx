import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {Dropdown} from '../material/dropdown'
import {themeSources} from '../theme/theme-sources'
import {selectedThemeSelector} from '../theme/selectors/selected-theme'
import {setThemeAction} from '../theme/actions/set-theme'
import {IRootState, ITranslateMixin, Dispatch} from '../types'

const mapStateToProps = (state: IRootState) => ({
  selectedTheme: selectedThemeSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({setTheme: setThemeAction}, dispatch)

type stateType = ReturnType<typeof mapStateToProps>
type dispatchType = ReturnType<typeof mapDispatchToProps>

type ThemeSelectionProps = stateType & dispatchType & ITranslateMixin

export function ThemeSelectionImpl({selectedTheme, setTheme, t}: ThemeSelectionProps) {
  // FIXME Regression: The dropdown's width is too small
  return <Dropdown label={t('Change theme')}
    source={themeSources} value={selectedTheme}
    onChange={setTheme} />
}

export const ThemeSelection = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(ThemeSelectionImpl)
