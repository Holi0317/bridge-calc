import React from "react";
import styled from "styled-components/macro";
import { TileLink } from "./tile-link";
import { Paper, Typography } from "@material-ui/core";

export interface TileProps {
  /** Title of the tile */
  title: string;
  /** Icon for the title, in React element format */
  icon: React.ReactNode;
  /** Path of the link for this tile links to */
  to?: string;
  /** `true` for external (not in the scope of this app) link */
  external?: boolean;
  /** Same functionality as HTML anchor element's `target` props */
  target?: string;
}

const TilePaper = styled(Paper)`
  width: 100%;
  min-height: 200px;

  transition: background 0.5s ease-in-out !important;
  will-change: background;

  margin: 0.5em 0 1em;
  overflow: hidden;
  box-sizing: border-box;
  text-align: center;

  &:active {
    background: ${props => props.theme.palette.action.selected};
  }
`;

const IconContainer = styled.div`
  margin: 0 auto;

  & > svg {
    width: 92px !important;
    height: 92px !important;
  }
`;

const TitleContainer = styled(Typography)`
  display: inline-block;
  padding: 16px;
`;

/**
 * A tile represents a block on menu
 */
export function Tile({ title, icon, external, target, to: _to }: TileProps) {
  const to = _to || "/";

  return (
    <TileLink to={to} external={external} target={target}>
      <TilePaper elevation={4}>
        <IconContainer>{icon}</IconContainer>
        <TitleContainer variant="h6">{title}</TitleContainer>
      </TilePaper>
    </TileLink>
  );
}
