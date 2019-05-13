import * as React from "react";
import { TileLink } from "./tile-link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import classes from "./tile.pcss";

export interface ITileProps {
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

/**
 * A tile represents a block on menu
 */
export function Tile({ title, icon, external, target, to: _to }: ITileProps) {
  const to = _to || "/";

  return (
    <TileLink to={to} external={external} target={target}>
      <Paper className={classes.tile} elevation={4}>
        <div className={classes.iconContainer}>{icon}</div>
        <Typography className={classes.titleContainer} variant="title">
          {title}
        </Typography>
      </Paper>
    </TileLink>
  );
}
