import {SvgIcon} from 'material-ui'
import TouchRipple from 'material-ui/internal/TouchRipple'
import {createElement as h} from 'react'

import './tile.scss'

export interface ITileProps {
  icon: typeof SvgIcon
  title: string
}

const iconStyle = {
  width: '92px',
  height: '92px'
}

export function Tile(props: ITileProps) {
  const title = props.title
  const Icon = props.icon
  return (
    <div className='tile'>
      <TouchRipple>
        <div className='icon-container'>
          <Icon style={iconStyle} />
        </div>
        <div className='title-container'>{title}</div>
      </TouchRipple>
    </div>
  )
}
