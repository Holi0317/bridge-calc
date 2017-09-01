import * as React from 'react'
import {Loading} from './loading'

interface ILazyViewState {
  module: React.ComponentType | null
}

export function lazyHOC(importer: () => Promise<React.ComponentType>) {
  return class WrappedLazyView extends React.Component<{}> {
    public state: ILazyViewState = {
      module: null
    }

    public componentWillMount() {
      importer()
        .then(mod => {
          this.setState(() => ({
            module: mod
          }))
        })
    }

    public render() {
      const Module = this.state.module
      if (Module) {
        return <Module />
      }
      return <Loading />
    }
  }
}
