import {h} from 'preact'
import {translate} from 'react-i18next'
import MdActionBugReport from 'react-icons/md/bug-report'
import MdActionInfo from 'react-icons/md/info'
import MdActionSettings from 'react-icons/md/settings'
import MdAvFiberNew from 'react-icons/md/fiber-new'
import MdAvPlayArrow from 'react-icons/md/play-arrow'
import MdAvSkipPrevious from 'react-icons/md/skip-previous'
import {Tile} from './tile'

function Menu_({t}) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Tile icon={MdAvPlayArrow} title={t('Continue')} />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-md-12">
          <Tile icon={MdAvFiberNew} title={t('New Game')} to="/entry" />
        </div>
        <div className="col-lg-6 col-md-12">
          <Tile icon={MdAvSkipPrevious} title={t('Previous games')} />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 col-md-12">
          <Tile icon={MdActionSettings} title={t('Settings')} />
        </div>
        <div className="col-lg-4 col-md-12">
          <Tile icon={MdActionInfo} title={t('Information')} />
        </div>
        <div className="col-lg-4 col-md-12">
          <Tile icon={MdActionBugReport} title={t('Support/bug')} />
        </div>
      </div>

    </div>
  )
}

export const Menu = translate()(Menu_)
