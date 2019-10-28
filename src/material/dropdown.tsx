import * as React from "react";
import { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { cuid } from "../utils";
import classes from "./dropdown.pcss";

export interface DropdownSource<T extends number | string> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps<T extends number | string> {
  source: DropdownSource<T>[];
  label: string;
  error?: string;
  value: T;
  disabled?: boolean;
  className?: string;
  onChange(value: T): void;
}

export function Dropdown<SourceType extends number | string>({
  source,
  label,
  error,
  onChange,
  ...rest
}: DropdownProps<SourceType>) {
  const [uid] = useState(() => cuid());

  return (
    <FormControl error={error != null} margin="normal">
      <InputLabel htmlFor={uid}>{label}</InputLabel>
      <Select
        {...rest}
        inputProps={{ name: label, id: uid }}
        classes={{
          root: classes.dropdownRoot,
          selectMenu: classes.dropdownSelectMenu
        }}
        onChange={(event: any) => onChange(event.target.value)}
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
