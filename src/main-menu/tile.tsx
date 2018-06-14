import * as React from 'react'
import {TileLink} from './tile-link'
import style from './tile.pcss'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography/Typography'

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
export class Tile extends React.Component<ITileProps> {
  public render() {
    const {title, icon, external, target} = this.props
    const to = this.props.to || '/'

    return (
      <TileLink to={to} external={external} target={target}>
        <Paper className={style.tile} elevation={4}>
          <div className={style.iconContainer}>{icon}</div>
          <Typography className={style.titleContainer} variant="title">{title}</Typography>
        </Paper>
      </TileLink>
    )
  }
}
