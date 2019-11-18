import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

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

const StyLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const StyA = styled.a`
  color: inherit;
  text-decoration: none;
`;

export function TileLink({ to, external, target, children }: TileLinkProps) {
  if (external) {
    return (
      <StyA href={to} target={target} rel="noopener">
        {children}
      </StyA>
    );
  }
  return (
    <StyLink to={to} target={target}>
      {children}
    </StyLink>
  );
}
