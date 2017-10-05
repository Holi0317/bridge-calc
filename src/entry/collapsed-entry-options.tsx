import * as React from 'react'
import {bindActionCreators, Dispatch} from 'redux'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import Collapse from 'react-collapse'
import {returntypeof} from 'react-redux-typescript'
import RaisedButton from 'material-ui/RaisedButton'
import {EntryOptions} from './entry-options'
import {toggleOptionOpen} from './actions/toggle-option-open'
import {IRootState, ITranslateMixin} from '../types'
import style from './entry.css'

const mapStateToProps = (state: IRootState) => ({
  optionsOpened: state.entry.optionsOpened
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({toggleOptionOpen}, dispatch)

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

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
