import * as React from 'react'
import Loadable from 'react-loadable'
import {hasOldData} from './old-state-manager'

const importer = () =>
  import('./migration-exec' /* webpackChunkName: "migration-exec" */)
    .then(mod => mod.MigrationExec)

const LoadableDialog = Loadable({
  loader: importer,
  loading: () => null // Just render nothing on loading. This module is not that important
})

interface IMigrationState {
  hasOldState: boolean
}

export class Migration extends React.Component {
  public state: IMigrationState = {
    hasOldState: false
  }

  public componentDidMount() {
    if (hasOldData()) {
      this.setState(() => ({
        hasOldState: true
      }))
    }
  }

  public render() {
    return this.state.hasOldState
      ? <LoadableDialog />
      : null
  }
}
