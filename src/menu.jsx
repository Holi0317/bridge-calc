import MdActionBugReport from 'react-icons/md/bug-report'
import MdActionInfo from 'react-icons/md/info'
import MdActionSettings from 'react-icons/md/settings'
import MdAvFiberNew from 'react-icons/md/fiber-new'
import MdAvPlayArrow from 'react-icons/md/play-arrow'
import MdAvSkipPrevious from 'react-icons/md/skip-previous'
import {h} from 'preact'
import {Tile} from './tile'

export function Menu() {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <Tile icon={MdAvPlayArrow} title='Continue' />
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-6 col-md-12'>
          <Tile icon={MdAvFiberNew} title='New Game' />
        </div>
        <div className='col-lg-6 col-md-12'>
          <Tile icon={MdAvSkipPrevious} title='Previous games' />
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-4 col-md-12'>
          <Tile icon={MdActionSettings} title='Settings' />
        </div>
        <div className='col-lg-4 col-md-12'>
          <Tile icon={MdActionInfo} title='Information' />
        </div>
        <div className='col-lg-4 col-md-12'>
          <Tile icon={MdActionBugReport} title='Support/bug' />
        </div>
      </div>

    </div>
  )
}
