// @flow
import {h, Component} from 'preact'
import {Loading} from './loading'

type LazyViewState = {
  module: ?ReactClass<void>
}

export function lazyHOC(importer: () => Promise<ReactClass<void>>) {
  return class WrappedLazyView extends Component {
    state: LazyViewState = {
      module: null
    }

    componentWillMount() {
      importer()
        .then(mod => {
          this.setState(() => ({
            module: mod
          }))
        })
    }

    render() {
      const Module = this.state.module
      if (Module) {
        return <Module />
      }
      return <Loading />
    }
  }
}
