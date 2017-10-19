import * as React from 'react'
import {Link} from 'react-router-dom'
import TouchRipple from 'material-ui/internal/TouchRipple'
import style from './tile.css'

export interface ITileProps {
  title: string,
  icon: React.ReactElement<{}>,
  to?: string
}

/**
 * A tile represents a block on menu
 * @param props.title - Title for the tile
 * @param props.icon - Icon for the tile, in SVG JSX format
 * @param props.to - Path of the link that this tile links to
 */
export function Tile(props: ITileProps) {
  const {title, icon} = props
  const to = props.to || '/'
  return (
    <Link to={to} className={style.link}>
      <TouchRipple>
        <div className={style.tile}>
          <div className={style.iconContainer}>{icon}</div>
          <div className={style.titleContainer}>{title}</div>
        </div>
      </TouchRipple>
    </Link>
  )
}
