import * as React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {$call, IRootState} from '../types'
import {closeToastAction} from './actions/close-toast'
import Snackbar from 'material-ui/Snackbar'

const mapStateToProps = (state: IRootState) => ({
  param: state.toastSingleton
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    close: closeToastAction
  }, dispatch)

const stateType = $call(mapStateToProps)
const dispatchType = $call(mapDispatchToProps)

type ToastSingletonProps = typeof stateType & typeof dispatchType

export function ToastSingletonImpl({param, close}: ToastSingletonProps) {
  return <Snackbar
    {...param}
    onRequestClose={close}
  />
}

export const ToastSingleton = connect(mapStateToProps, mapDispatchToProps)(ToastSingletonImpl)
