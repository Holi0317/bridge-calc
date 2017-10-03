import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import Collapse from 'react-collapse'
import {returntypeof} from 'react-redux-typescript'
import RaisedButton from 'material-ui/RaisedButton'
import {EntryOptions} from './entry-options'
import {IOptionOpenToggleAction, OPTION_OPEN_TOGGLE} from './entry-actions'
import {Dispatch, IRootState, ITranslateMixin} from '../types'
import style from './entry.css'

const mapStateToProps = (state: IRootState) => ({
  optionsOpened: state.entry.optionsOpened
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleCollapse() {
    const action: IOptionOpenToggleAction = {type: OPTION_OPEN_TOGGLE}
    dispatch(action)
  }
})

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type CollapsedEntryOptionsProps = typeof stateType & typeof dispatchType & ITranslateMixin

export function CollapsedEntryOptionsImpl({toggleCollapse, optionsOpened, t}: CollapsedEntryOptionsProps) {
  return (
    <div>
      <RaisedButton onClick={toggleCollapse} className={style.optionsBtn}>{t('Options')}</RaisedButton>
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
