// @flow
import {lazyHOC} from './lazy-hoc'

const importer = () =>
  import ('../menu' /* webpackChunkName: "menu-view" */)
    .then(mod => mod.Menu)

export const Menu = lazyHOC(importer)
