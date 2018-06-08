import * as Loadable from 'react-loadable'
import {Loading} from './loading'

const importer = () =>
  import('../global-settings' /* webpackChunkName: "global-settings-view" */)
    .then(mod => mod.GlobalSettings)

export const GlobalSettingsView = Loadable({
  loader: importer,
  loading: Loading
})
