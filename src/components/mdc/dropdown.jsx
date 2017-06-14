// @flow
import {h, Component} from 'preact'
import type {DropdownSource} from '../../types'
import style from './dropdown.css'

export type DropdownProps<T> = {
  label?: string,
  value: T,
  source: DropdownSource<T>[],
  disabled?: boolean,
  className?: string,
  error?: string,
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
    const {label, source, disabled, className, error} = this.props
    const {index} = this.state
    const class_ = `mdc-select ${className || ''}`
    const errClass = style.error + (error ? ' ' + style.hasError : '')
    return (
      <div className={style.container}>
        <select className={class_} onChange={this._handler} disabled={disabled} aria-disabled={disabled}>
          { label
            ? <option value="" default disabled>{label}</option>
            : null }
          {source.map((s, i) => (
            <option key={i} value={s.value} selected={i === index} disabled={s.disabled} aria-disabled={s.disabled}>{s.label}</option>
          ))}
        </select>
        <span className={errClass}>{error}</span>
      </div>
    )
  }
}
