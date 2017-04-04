declare module 'preact-delegate' {
  import {Component} from 'react' // Declare this as preact element will cause TS to be unhappy
  export class DelegateContainer extends Component<{}, {}> {}
  export class DelegateElement extends Component<{}, {}> {}
}
