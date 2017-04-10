import {h} from 'preact'
import Ripple from 'react-toolbox/components/ripple'
import {Link} from 'react-router-dom'
import style from './tile.css'

const iconStyle = {
  width: '92px',
  height: '92px'
}

const RippleWrapper = Ripple()((props) => <div {...props} style={{position: 'relative'}}>{props.children}</div>)

/**
 * A tile represents a block on menu
 * @param props.title {string} - Title for the tile
 * @param props.icon {SvgIcon} - Icon for the tile, in SVG JSX format
 * @param props.to {string|null} - Path of the link that this tile links to
 * @returns {XML}
 */
export function Tile(props) {
  const title = props.title
  const MyIcon = props.icon
  const to = props.to || '/'
  return (
    <Link to={to} className={style.link}>
      <div className={style.tile}>
        <RippleWrapper>
          <div className={style['icon-container']}>
            <MyIcon style={iconStyle} />
          </div>
          <div className={style['title-container']}>{title}</div>
        </RippleWrapper>
      </div>
    </Link>
  )
}
