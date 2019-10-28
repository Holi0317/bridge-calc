import * as React from "react";
import { Link } from "react-router-dom";
import classes from "./tile.pcss";

export interface TileLinkProps {
  /**
   * URL of this link pointing to.
   * If the link is point to external route path, remember to
   * specify protocol in URL.
   */
  to: string;
  /**
   * Determine if the URL is external or not.
   * By default, the link is internal.
   */
  external?: boolean;
  /**
   * Same functionality as the `target` props in HTML anchor (<a>) element
   */
  target?: string;
  children: React.ReactNode;
}

export function TileLink({ to, external, target, children }: TileLinkProps) {
  if (external) {
    return (
      <a href={to} target={target} className={classes.link} rel="noopener">
        {children}
      </a>
    );
  }
  return (
    <Link to={to} target={target} className={classes.link}>
      {children}
    </Link>
  );
}
