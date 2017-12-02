import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {returntypeof} from 'react-redux-typescript'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import FlatButton from 'material-ui/FlatButton'
import {IRootState, ITranslateMixin} from '../../types'
import styles from './skip-rounds.css'

const mapStateToProps = (state: IRootState) => ({

})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({}, dispatch)

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type SkipRoundsProps = typeof stateType & typeof dispatchType & ITranslateMixin

export function SkipRoundsImpl({t}: SkipRoundsProps) {
  return (
    <div className={styles.btnContainer}>
      <FlatButton className={styles.btn} label={t('Skip this round')} />
      <FlatButton className={styles.btn} label={t('Skip to last round')} />
      <FlatButton className={styles.btn} label={t('End game')} />
    </div>
  )
}

export const SkipRounds = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(SkipRoundsImpl) as React.StatelessComponent<{}>
