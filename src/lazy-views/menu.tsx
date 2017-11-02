import Loadable from 'react-loadable'
import {Loading} from './loading'

const importer = () =>
  import('../main-menu' /* webpackChunkName: "menu-view" */)
    .then(mod => mod.Menu)

export const MenuView = Loadable({
  loader: importer,
  loading: Loading
})
