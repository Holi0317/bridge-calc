import * as React from 'react'
import {bindActionCreators, Dispatch} from 'redux'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import {EntryOptions} from './entry-options'
import {toggleOptionOpenAction} from './actions/toggle-option-open'
import {IRootState, ITranslateMixin} from '../types'
import style from './entry.css'

const mapStateToProps = (state: IRootState) => ({
  optionsOpened: state.entry.optionsOpened
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
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
      <RaisedButton onClick={toggleOptionOpen} className={style.optionsBtn} label={t('Options')} />
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
