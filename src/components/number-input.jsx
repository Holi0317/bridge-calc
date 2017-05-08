// @flow
import {h, Component} from 'preact'
import Input from 'react-toolbox/components/input'

export class NumberInput extends Component {
  ref: ?any
  props: any

  setRef = (ref: ?any) => {
    this.ref = ref
  }

  onChange = (value: string) => {
    if (this.props.onChange) {
      if (this.ref) {
        const inputNode = this.ref.refs.wrappedInstance.inputNode
        this.props.onChange(value, !inputNode.validity.badInput)
      } else {
        this.props.onChange(value, true)
      }
    }
    // No onChange handler
  }

  render() {
    return <Input {...this.props} type="number" ref={this.setRef} onChange={this.onChange} />
  }
}
