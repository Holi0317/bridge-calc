import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {bindActionCreators} from 'redux'
import {showToastAction} from '../toast-singleton/actions/show-toast'
import {replaceCurrentGameAction} from '../score-input/actions/replace-current-game'
import {hasOldData, retrieveOldData, deleteOldData, isNotStarted} from './old-state-manager'
import {migrateOldState} from './converter'
import {ITranslateMixin, Dispatch} from '../types'

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    showToast: showToastAction,
    replaceCurrentGame: replaceCurrentGameAction
  }, dispatch)

type dispatchType = ReturnType<typeof mapDispatchToProps>

export class MigrationExecImpl extends React.Component {
  public props: dispatchType & ITranslateMixin

  public componentDidMount() {
    setTimeout(() => {
      if (hasOldData()) {
        this.tryMigrate()
      }
    }, 500)
  }

  public render() {
    return null
  }

  private tryMigrate = () => {
    try {
      const oldState = retrieveOldData()
      if (oldState == null) {
        // False positive on checking
        return
      }

      if (isNotStarted(oldState)) {
        // Not started data
        deleteOldData()
        return
      }

      const state = migrateOldState(oldState)

      const {replaceCurrentGame, showToast, t} = this.props
      replaceCurrentGame(state)
      showToast(t('Migrated game data from old version'))

    } catch (e) {
      console.error('Error when migrating old data', e)
      deleteOldData()
    }
  }

}

export const MigrationExec = flowRight(
  translate(),
  connect(null, mapDispatchToProps)
)(MigrationExecImpl)
