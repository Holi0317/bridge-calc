import ActionBugReport from 'material-ui/svg-icons/action/bug-report'
import ActionInfo from 'material-ui/svg-icons/action/info'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import AvFiberNew from 'material-ui/svg-icons/av/fiber-new'
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow'
import AvSkipPrevious from 'material-ui/svg-icons/av/skip-previous'
import {createElement as h} from 'react'
import {Tile} from './tile'

export function Menu() {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <Tile icon={AvPlayArrow} title='Continue' />
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-6 col-md-12'>
          <Tile icon={AvFiberNew} title='New Game' />
        </div>
        <div className='col-lg-6 col-md-12'>
          <Tile icon={AvSkipPrevious} title='Previous games' />
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-4 col-md-12'>
          <Tile icon={ActionSettings} title='Settings' />
        </div>
        <div className='col-lg-4 col-md-12'>
          <Tile icon={ActionInfo} title='Information' />
        </div>
        <div className='col-lg-4 col-md-12'>
          <Tile icon={ActionBugReport} title='Support/bug' />
        </div>
      </div>

    </div>
  )
}
