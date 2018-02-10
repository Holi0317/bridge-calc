import * as React from 'react'
import {bindActionCreators, Dispatch} from 'redux'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import Collapse from 'react-collapse'
import {$call} from 'utility-types'
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

const stateType = $call(mapStateToProps)
const dispatchType = $call(mapDispatchToProps)

type CollapsedEntryOptionsProps = typeof stateType & typeof dispatchType & ITranslateMixin

export function CollapsedEntryOptionsImpl({toggleOptionOpen, optionsOpened, t}: CollapsedEntryOptionsProps) {
  return (
    <div>
      <RaisedButton onClick={toggleOptionOpen} className={style.optionsBtn}>{t('Options')}</RaisedButton>
      <Collapse isOpened={optionsOpened}>
        <EntryOptions />
      </Collapse>
    </div>
  )
}

export const CollapsedEntryOptions = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(CollapsedEntryOptionsImpl)
