import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {returntypeof} from 'react-redux-typescript'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {IRootState, ITranslateMixin} from '../types'

const mapStateToProps = (state: IRootState) => ({

})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({}, dispatch)

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type GlobalSettingsProps = typeof stateType & typeof dispatchType & ITranslateMixin

export function GlobalSettingsImpl({t}: GlobalSettingsProps) {
  return null
}

export const GlobalSettings = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalSettingsImpl)
