import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow'
import AvFiberNew from 'material-ui/svg-icons/av/fiber-new'
import AvSkipPrevious from 'material-ui/svg-icons/av/skip-previous'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import ActionInfo from 'material-ui/svg-icons/action/info'
import ActionBugReport from 'material-ui/svg-icons/action/bug-report'
import {Tile} from '../material/tile'
import {ITranslateMixin} from '../types'
import grid from '../styles/grid.css'

function MenuImpl({t}: ITranslateMixin) {
  return (
    <div className={grid.container}>
      <div className={grid.row}>
        <div className={grid.col12}>
          <Tile icon={AvPlayArrow} title={t('Continue')} />
        </div>
      </div>

      <div className={grid.row}>
        <div className={`${grid.colLg6} ${grid.colMd12}`}>
          <Tile icon={AvFiberNew} title={t('New Game')} to="/entry" />
        </div>
        <div className={`${grid.colLg6} ${grid.colMd12}`}>
          <Tile icon={AvSkipPrevious} title={t('Previous games')} />
        </div>
      </div>

      <div className={grid.row}>
        <div className={`${grid.colLg4} ${grid.colMd12}`}>
          <Tile icon={ActionSettings} title={t('Settings')} />
        </div>
        <div className={`${grid.colLg4} ${grid.colMd12}`}>
          <Tile icon={ActionInfo} title={t('Information')} />
        </div>
        <div className={`${grid.colLg4} ${grid.colMd12}`}>
          <Tile icon={ActionBugReport} title={t('Support/bug')} />
        </div>
      </div>

    </div>
  )
}

export const Menu = flowRight(
  translate()
)(MenuImpl)
