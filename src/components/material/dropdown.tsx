import * as React from 'react'
import {TouchTapEvent} from 'material-ui'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import {IDropdownSource} from '../../types'

export interface IDropdownProps<T> {
  label: string
  value: T
  source: Array<IDropdownSource<T>>
  disabled?: boolean
  className?: string
  error?: string
  onChange: (value: T) => void
}

export class Dropdown<SourceType> extends React.Component {
  public props: IDropdownProps<SourceType>

  public render() {
    const {source, ...rest} = this.props
    return (
      <DropDownMenu {...rest} onChange={this.handleChange}>
        {source.map(item => (
          <MenuItem key={item.label} value={item.value} primaryText={item.label} disabled={item.disabled} />
        ))}
      </DropDownMenu>
    )
  }

  private handleChange = (event: TouchTapEvent, index: number, value: SourceType) => {
    this.props.onChange(value)
  }
}
