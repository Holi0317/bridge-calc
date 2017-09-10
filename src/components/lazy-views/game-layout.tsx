import Loadable from 'react-loadable'
import {Loading} from './loading'

const importer = () =>
  import ('../game/layout' /* webpackChunkName: "game-layout-view" */)
    .then(mod => mod.Layout)

export const Layout = Loadable({
  loader: importer,
  loading: Loading
})
