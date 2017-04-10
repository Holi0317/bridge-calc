import ActionBugReport from 'react-icons/lib/md/bug-report'
import ActionInfo from 'react-icons/lib/md/info'
import ActionSettings from 'react-icons/lib/md/settings'
import AvFiberNew from 'react-icons/lib/md/fiber-new'
import AvPlayArrow from 'react-icons/lib/md/play-arrow'
import AvSkipPrevious from 'react-icons/lib/md/skip-previous'
import {h} from 'preact'
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
