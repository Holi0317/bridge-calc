import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { cuid } from "../utils";

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText
} from "@material-ui/core";

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

const StyledSelect = styled(Select)`
  min-width: 150px;
  .MuiSelect-selectMenu {
    min-width: 150px;
  }
`;

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
      <StyledSelect
        {...rest}
        inputProps={{ name: label, id: uid }}
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
      </StyledSelect>
      {error != null && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
