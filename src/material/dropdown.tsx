import * as React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { cuid } from "../utils";
import classes from "./dropdown.pcss";

export interface IDropdownSource<T extends number | string> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface IDropdownProps<T extends number | string> {
  source: Array<IDropdownSource<T>>;
  label: string;
  error?: string;
  value: T;
  disabled?: boolean;
  className?: string;
  onChange(value: T): void;
}

export class Dropdown<
  SourceType extends number | string
> extends React.Component {
  public props: IDropdownProps<SourceType>;
  private readonly _uid = cuid();

  public render() {
    const { source, label, error, ...rest } = this.props;

    return (
      <FormControl error={error != null} margin="normal">
        <InputLabel htmlFor={this._uid}>{label}</InputLabel>
        <Select
          {...rest}
          inputProps={{ name: label, id: this._uid }}
          classes={{
            root: classes.dropdownRoot,
            selectMenu: classes.dropdownSelectMenu
          }}
          onChange={this.handleChange}
        >
          {source.map(item => (
            <MenuItem
              key={item.label}
              value={item.value}
              disabled={item.disabled}
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
        {error != null && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }

  private handleChange = (event: any) => {
    this.props.onChange(event.target.value);
  };
}
