import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators} from 'redux'
import {translate} from 'react-i18next'
import {connect, Dispatch} from 'react-redux'
import {returntypeof} from 'react-redux-typescript'
import {ITranslateMixin} from '../types'
import RaisedButton from 'material-ui/RaisedButton'

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({}, dispatch)

const dispatchType = returntypeof(mapDispatchToProps)

type PurgeDataProps = typeof dispatchType & ITranslateMixin

export function PurgeDataImpl({t}: PurgeDataProps) {
  // TODO button click handler and snackbar
  return (
    <div>
      <RaisedButton label={t('Clear all data')} primary={true} />
    </div>
  )
}

export const PurgeData = flowRight(
  translate(),
  connect(null, mapDispatchToProps)
)(PurgeDataImpl) as React.StatelessComponent<{}>
