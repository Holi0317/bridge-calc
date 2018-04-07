import * as React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {closeToastAction} from './actions/close-toast'
import Snackbar from 'material-ui/Snackbar'
import {IRootState} from '../types'

const mapStateToProps = (state: IRootState) => ({
  param: state.toastSingleton
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    close: closeToastAction
  }, dispatch)

type stateType = ReturnType<typeof mapStateToProps>
type dispatchType = ReturnType<typeof mapDispatchToProps>

type ToastSingletonProps = stateType & dispatchType

export function ToastSingletonImpl({param, close}: ToastSingletonProps) {
  return <Snackbar
    {...param}
    onRequestClose={close}
  />
}

export const ToastSingleton = connect(mapStateToProps, mapDispatchToProps)(ToastSingletonImpl)
