// @flow
import {h, Component} from 'preact'
import type {DropdownSource} from '../../types'

export type DropdownProps<T> = {
  label?: string,
  value: T,
  source: DropdownSource<T>[],
  onChange: (value: T) => void
}

type DropdownState = {
  handler: (e: ChangedParam) => void,
  index: number
}

type ChangedParam = {
  selectedIndex: number
}

export class Dropdown<SourceType> extends Component<void, DropdownProps<SourceType>, DropdownState> {
  props: DropdownProps<SourceType>
  state: DropdownState

  constructor(props: DropdownProps<SourceType>) {
    super(...arguments)
    this._refreshProps(props)
  }

  componentWillReceiveProps(nextProps: DropdownProps<SourceType>) {
    this._refreshProps(nextProps)
  }

  _handler = (event: Event) => {
    const {onChange} = this.props
    if (onChange) {
      const el: HTMLSelectElement = (event.target: any)
      const selected = el.selectedIndex - 1
      const index = selected < 0 ? 0 : selected
      const src = this.props.source[index]
      onChange(src.value)
    }
  }

  _refreshProps({source, value}: DropdownProps<SourceType>) {
    this.setState(() => ({
      index: source.map(s => s.value).indexOf(value)
    }))
  }

  render() {
    const {label, source} = this.props
    const {index} = this.state
    return (
      <select className="mdc-select" onChange={this._handler}>
        { label
          ? <option value="" default disabled>{label}</option>
          : null }
        {source.map((s, i) => (
          <option key={i} value={s.value} selected={i === index}>{s.label}</option>
        ))}
      </select>
    )
  }
}
