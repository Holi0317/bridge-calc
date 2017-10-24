import * as React from 'react'
import {TileLink} from './tile-link'
import style from './tile.css'

export interface ITileProps {
  title: string
  icon: React.ReactNode
  to?: string
  external?: boolean
  target?: string
}

/**
 * A tile represents a block on menu
 * @param props.title - Title for the tile
 * @param props.icon - Icon for the tile, in React element format
 * @param props.to - Path of the link that this tile links to
 * @param props.external - If the link is an external link or not.
 * By default, all links are internal links.
 * @param props.target - Same functionality as HTML anchor element's `target` props.
 */
export function Tile(props: ITileProps) {
  const {title, icon, external, target} = props
  const to = props.to || '/'
  return (
    <TileLink to={to} external={external} target={target}>
      <div className={style.tile}>
        <div className={style.iconContainer}>{icon}</div>
        <div className={style.titleContainer}>{title}</div>
      </div>
    </TileLink>
  )
}
