import React from "react";
import styled from "styled-components";
import { TableCell } from "@material-ui/core";

interface Props {
  children: number;
  bold?: boolean;
}

/**
 * Render a <td> that is aware of applying color to the given score
 * Pass in score to be rendered as child
 */
export const ScoreCell = styled(({ error, bold, ...rest }) => (
  <TableCell align="right" {...rest} />
))<Props>`
  font-weight: ${props => (props.bold ? "bold" : "inherit")};
  color: ${props =>
    props.error ? props.theme.palette.error.main : "inherit"} !important;
`;
