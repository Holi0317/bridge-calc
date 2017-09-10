import Loadable from 'react-loadable'
import {Loading} from './loading'

const importer = () =>
  import ('../menu' /* webpackChunkName: "menu-view" */)
    .then(mod => mod.Menu)

export const Menu = Loadable({
  loader: importer,
  loading: Loading
})
