import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {Dropdown} from '../../material/dropdown'
import {makerSourceSelector} from './selectors/maker-source'
import {SET_MAKER, ISetMakerAction} from './actions/index'
import {Dispatch, IRootState, ITranslateMixin} from '../../types'
import {makerSelector} from './selectors/maker'
import {returntypeof} from 'react-redux-typescript'

const mapStateToProps = (state: IRootState) => ({
  names: makerSourceSelector(state),
  maker: makerSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChange(ID: string) {
    const action: ISetMakerAction = {
      type: SET_MAKER,
      maker: ID
    }
    dispatch(action)
  }
})

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type MakerChooserProps = typeof stateType & typeof dispatchType & ITranslateMixin

export function MakerChooserImpl({names, maker, onChange, t}: MakerChooserProps) {
  return (
    <Dropdown label={t('Maker')} source={names} value={maker || ''} onChange={onChange} />
  )
}

export const MakerChooser = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(MakerChooserImpl)
