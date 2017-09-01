import * as React from 'react'
import {Link} from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import style from './tile.css'

const iconStyle = {
  width: '92px',
  height: '92px'
}

export interface ITileProps {
  title: string,
  icon: any,
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
      <RaisedButton label={title} />
    </Link>
  )
}
