import * as React from 'react'
import {bindActionCreators} from 'redux'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import {EntryOptions} from './entry-options'
import {toggleOptionOpenAction} from './actions/toggle-option-open'
import {Dispatch, IRootState, ITranslateMixin} from '../types'
import style from './entry.css'

const mapStateToProps = (state: IRootState) => ({
  optionsOpened: state.entry.optionsOpened
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({toggleOptionOpen: toggleOptionOpenAction}, dispatch)

type stateType = ReturnType<typeof mapStateToProps>
type dispatchType = ReturnType<typeof mapDispatchToProps>

type CollapsedEntryOptionsProps = stateType & dispatchType & ITranslateMixin

export function CollapsedEntryOptionsImpl({toggleOptionOpen, optionsOpened, t}: CollapsedEntryOptionsProps) {
  const collapseCss = [style.collapse]
  if (optionsOpened) {
    collapseCss.push(style.collapseOpen)
  }

  return (
    <div>
      <Button variant="contained" onClick={toggleOptionOpen} className={style.optionsBtn}>{t('Options')}</Button>
      {/* TODO Use Collapse from material-ui */}
      {/* FIXME Regression: The container is too compact */}
      <div className={collapseCss.join(' ')}>
        <EntryOptions />
      </div>
    </div>
  )
}

export const CollapsedEntryOptions = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(CollapsedEntryOptionsImpl)
