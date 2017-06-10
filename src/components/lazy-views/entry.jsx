// @flow
import {lazyHOC} from './lazy-hoc'

const importer = () =>
  import ('../entry' /* webpackChunkName: "entry-view" */)
    .then(mod => mod.Entry)

export const Entry = lazyHOC(importer)
