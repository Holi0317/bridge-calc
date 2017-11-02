import Loadable from 'react-loadable'
import {Loading} from './loading'

const importer = () =>
  import('../entry' /* webpackChunkName: "entry-view" */)
    .then(mod => mod.Entry)

export const EntryView = Loadable({
  loader: importer,
  loading: Loading
})
