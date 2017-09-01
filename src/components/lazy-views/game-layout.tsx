import {lazyHOC} from './lazy-hoc'

const importer = () =>
  import ('../game/layout' /* webpackChunkName: "game-layout-view" */)
    .then(mod => mod.Layout)

export const Layout = lazyHOC(importer)
