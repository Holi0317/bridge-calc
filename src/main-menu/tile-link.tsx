import * as React from 'react'
import {Link} from 'react-router-dom'
import style from './tile.css'

export interface ITileLinkProps {
  /**
   * URL of this link pointing to.
   * If the link is point to external route path, remember to
   * specify protocol in URL.
   */
  to: string
  /**
   * Determine if the URL is external or not.
   * By default, the link is internal.
   */
  external?: boolean
  /**
   * Same functionality as the `target` props in HTML anchor (<a>) element
   */
  target?: string
  children: React.ReactElement<any>
}

export function TileLink({to, external, target, children}: ITileLinkProps) {
  if (external) {
    return <a href={to} target={target} className={style.link}>
      {children}
    </a>
  }
  return <Link to={to} target={target} className={style.link}>
    {children}
  </Link>
}
