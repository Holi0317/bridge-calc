import * as React from 'react'
import {translate} from 'react-i18next'
import MdActionBugReport from 'react-icons/md/bug-report'
import MdActionInfo from 'react-icons/md/info'
import MdActionSettings from 'react-icons/md/settings'
import MdAvFiberNew from 'react-icons/md/fiber-new'
import MdAvPlayArrow from 'react-icons/md/play-arrow'
import MdAvSkipPrevious from 'react-icons/md/skip-previous'
import {Tile} from './tile'
import {ITranslateMixin} from '../types'
import grid from '../styles/grid.css'

function MenuImpl({t}: ITranslateMixin) {
  return (
    <div className={grid.container}>
      <div className={grid.row}>
        <div className={grid.col12}>
          <Tile icon={MdAvPlayArrow} title={t('Continue')} />
        </div>
      </div>

      <div className={grid.row}>
        <div className={`${grid.colLg6} ${grid.colMd12}`}>
          <Tile icon={MdAvFiberNew} title={t('New Game')} to="/entry" />
        </div>
        <div className={`${grid.colLg6} ${grid.colMd12}`}>
          <Tile icon={MdAvSkipPrevious} title={t('Previous games')} />
        </div>
      </div>

      <div className={grid.row}>
        <div className={`${grid.colLg4} ${grid.colMd12}`}>
          <Tile icon={MdActionSettings} title={t('Settings')} />
        </div>
        <div className={`${grid.colLg4} ${grid.colMd12}`}>
          <Tile icon={MdActionInfo} title={t('Information')} />
        </div>
        <div className={`${grid.colLg4} ${grid.colMd12}`}>
          <Tile icon={MdActionBugReport} title={t('Support/bug')} />
        </div>
      </div>

    </div>
  )
}

export const Menu = translate()(MenuImpl)
