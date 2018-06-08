import * as React from 'react'
import {TileLink} from './tile-link'
import style from './tile.css'

export interface ITileProps {
  /** Title of the tile */
  title: string
  /** Icon for the title, in React element format */
  icon: React.ReactNode
  /** Path of the link for this tile links to */
  to?: string
  /** `true` for external (not in the scope of this app) link */
  external?: boolean
  /** Same functionality as HTML anchor element's `target` props */
  target?: string
}

/**
 * A tile represents a block on menu
 */
export function Tile(props: ITileProps) {
  const {title, icon, external, target} = props
  const to = props.to || '/'

  // FIXME Regression: icon color does not respect dark theme
  return (
    <TileLink to={to} external={external} target={target}>
      <div className={style.tile}>
        <div className={style.iconContainer}>{icon}</div>
        <div className={style.titleContainer}>{title}</div>
      </div>
    </TileLink>
  )
}
