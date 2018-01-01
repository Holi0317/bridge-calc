import Loadable from 'react-loadable'
import {Loading} from './loading'

const importer = () =>
  import('../help' /* webpackChunkName: "help-view" */)
    .then(mod => mod.Help)

export const HelpView = Loadable({
  loader: importer,
  loading: Loading
})
