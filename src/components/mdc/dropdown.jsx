// @flow
import {h, Component} from 'preact'
import Select from 'preact-material-components/Select/Select'
import type {DropdownSource} from '../../types'

export type DropdownProps<T> = {
  label: string,
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

  _refreshProps({onChange, source, value}: DropdownProps<SourceType>) {
    this.setState(() => ({
      handler: (e: ChangedParam) => onChange && onChange(source[e.selectedIndex].value),
      index: source.map(s => s.value).indexOf(value)
    }))
  }

  render() {
    const {label, source} = this.props
    const {handler, index} = this.state
    return (
      <Select hintText={label} onChange={handler} selectedIndex={index}>
        {source.map(s => (
          <Select.Item key={s.label}>{s.label}</Select.Item>
        ))}
      </Select>
    )
  }
}
