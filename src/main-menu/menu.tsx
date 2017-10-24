import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {Grid, Row, Col} from 'react-flexbox-grid'
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow'
import AvFiberNew from 'material-ui/svg-icons/av/fiber-new'
import AvSkipPrevious from 'material-ui/svg-icons/av/skip-previous'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import ActionInfo from 'material-ui/svg-icons/action/info'
import ActionBugReport from 'material-ui/svg-icons/action/bug-report'
import {Tile} from './tile'
import {ITranslateMixin} from '../types'

export function MenuImpl({t}: ITranslateMixin) {
  return (
    <Grid>
      {/* TODO hide his row if there is no game to continue */}
      <Row>
        <Col xs={12}>
          <Tile icon={<AvPlayArrow />} title={t('Continue')} />
        </Col>
      </Row>

      <Row>
        <Col md={6} xs={12}>
          <Tile icon={<AvFiberNew />} title={t('New Game')} to="/entry" />
        </Col>
        <Col md={6} xs={12}>
          <Tile icon={<AvSkipPrevious />} title={t('Previous games')} to="/prev-games" />
        </Col>
      </Row>

      <Row>
        <Col md={4} xs={12}>
          <Tile icon={<ActionSettings />} title={t('Settings')} to="/global-settings" />
        </Col>
        <Col md={4} xs={12}>
          <Tile icon={<ActionInfo />} title={t('Information')} />
        </Col>
        <Col md={4} xs={12}>
          <Tile icon={<ActionBugReport />} title={t('Support/bug')} to="https://github.com/holi0317/bridge-calc" external={true} target="_blank" />
        </Col>
      </Row>

    </Grid>
  )
}

export const Menu = flowRight(
  translate()
)(MenuImpl)
