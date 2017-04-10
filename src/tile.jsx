import {h} from 'preact'
import Ripple from 'react-toolbox/lib/ripple'
import './tile.scss'

const iconStyle = {
  width: '92px',
  height: '92px'
}

const RippleWrapper = Ripple()((props) => <div {...props} style={{position: 'relative'}}>{props.children}</div>)

/**
 * A tile represents a block on menu
 * @param props.title {string} - Title for the tile
 * @param props.icon {SvgIcon} - Icon for the tile, in SVG JSX format
 * @returns {XML}
 */
export function Tile(props) {
  const title = props.title
  const MyIcon = props.icon
  return (
    <div className="tile">
      <RippleWrapper>
        <div className='icon-container'>
          <MyIcon style={iconStyle} />
        </div>
        <div className='title-container'>{title}</div>
      </RippleWrapper>
    </div>
  )
}
