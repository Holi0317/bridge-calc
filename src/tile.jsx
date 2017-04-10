import TouchRipple from 'material-ui/internal/TouchRipple'
import {h} from 'preact'

import './tile.scss'

const iconStyle = {
  width: '92px',
  height: '92px'
}

/**
 * A tile represents a block on menu
 * @param props.title {string} - Title for the tile
 * @param props.icon {SvgIcon} - Icon for the tile, in SVG JSX format
 * @returns {XML}
 */
export function Tile(props) {
  const title = props.title
  const I = props.icon
  return (
    <div className='tile'>
      <TouchRipple>
        <div className='icon-container'>
          <I style={iconStyle} />
        </div>
        <div className='title-container'>{title}</div>
      </TouchRipple>
    </div>
  )
}
