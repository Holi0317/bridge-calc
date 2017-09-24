import * as React from 'react'
import {Link} from 'react-router-dom'
import SvgIcon from 'material-ui/SvgIcon'
import TouchRipple from 'material-ui/internal/TouchRipple'
import style from './tile.css'

const iconStyle = {
  width: 92,
  height: 92
}

export interface ITileProps {
  title: string,
  icon: typeof SvgIcon,
  to?: string
}

/**
 * A tile represents a block on menu
 * @param props.title - Title for the tile
 * @param props.icon - Icon for the tile, in SVG JSX format
 * @param props.to - Path of the link that this tile links to
 */
export function Tile(props: ITileProps) {
  const title = props.title
  const MyIcon = props.icon
  const to = props.to || '/'
  return (
    <Link to={to} className={style.link}>
      <TouchRipple>
        <div className={style.tile}>
          <div className={style.iconContainer}><MyIcon style={iconStyle} /></div>
          <div className={style.titleContainer}>{title}</div>
        </div>
      </TouchRipple>
    </Link>
  )
}
