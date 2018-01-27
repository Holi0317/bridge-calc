import * as React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {IDropdownSource} from '../types'

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
    const {source, label, error, ...rest} = this.props
    return (
      <SelectField floatingLabelText={label} errorText={error} {...rest} onChange={this.handleChange}>
        {source.map(item => (
          <MenuItem key={item.label} value={item.value} primaryText={item.label} disabled={item.disabled} />
        ))}
      </SelectField>
    )
  }

  private handleChange = (_event: React.SyntheticEvent<{}>, _index: number, value: SourceType) => {
    this.props.onChange(value)
  }
}
