// @flow
import {h} from 'preact'
import MaterialComponent from 'preact-material-components/MaterialComponent'
import {Link} from 'react-router-dom'
import style from './tile.css'

const iconStyle = {
  width: '92px',
  height: '92px'
}

class RippleWrapper extends MaterialComponent {
  control: HTMLElement
  static defaultProps = {
    ripple: true
  }

  componentDidMount() {
    this.attachRipple()
  }

  render(props) {
    const className = `mdc-ripple-surface ${style.rippleContainer}`
    return (
      <div ref={control => (this.control = control)} className={className}>
        {props.children}
      </div>
    )
  }
}

export type TileProperties = {
  title: string,
  icon: any,
  to?: string
}

/**
 * A tile represents a block on menu
 * @param props.title - Title for the tile
 * @param props.icon - Icon for the tile, in SVG JSX format
 * @param props.to - Path of the link that this tile links to
 * @returns {XML}
 */
export function Tile(props: TileProperties) {
  const title = props.title
  const MyIcon = props.icon
  const to = props.to || '/'
  return (
    <Link to={to} className={style.link}>
      <div className={style.tile}>
        <RippleWrapper>
          <div className={style.iconContainer}>
            <MyIcon style={iconStyle} />
          </div>
          <div className={style.titleContainer}>{title}</div>
        </RippleWrapper>
      </div>
    </Link>
  )
}
