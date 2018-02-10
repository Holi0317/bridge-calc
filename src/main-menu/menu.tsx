import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {Container, Row, Col} from 'react-grid-system'
import {$call} from 'utility-types'
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow'
import AvFiberNew from 'material-ui/svg-icons/av/fiber-new'
import AvSkipPrevious from 'material-ui/svg-icons/av/skip-previous'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import ActionInfo from 'material-ui/svg-icons/action/info'
import ActionBugReport from 'material-ui/svg-icons/action/bug-report'
import {Tile} from './tile'
import {showContinueSelector} from './show-continue-selector'
import {IRootState, ITranslateMixin} from '../types'

const mapStateToProps = (state: IRootState) => ({
  showContinue: showContinueSelector(state)
})

const stateType = $call(mapStateToProps)

type MenuProps = typeof stateType & ITranslateMixin

export function MenuImpl({showContinue, t}: MenuProps) {
  return (
    <Container>
      {showContinue
        ? <Row>
          <Col xs={12}>
            <Tile icon={<AvPlayArrow />} title={t('Continue')} to="/score-input" />
          </Col>
        </Row>
        : null
      }

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
          <Tile icon={<ActionInfo />} title={t('Information')} to="https://gitlab.com/holi0317/bridge-calc/blob/master/docs/en.md" external={true} target="_blank" />
        </Col>
        <Col md={4} xs={12}>
          <Tile icon={<ActionBugReport />} title={t('Support/bug')} to="https://gitlab.com/holi0317/bridge-calc/issues" external={true} target="_blank" />
        </Col>
      </Row>

    </Container>
  )
}

export const Menu = flowRight(
  translate(),
  connect(mapStateToProps)
)(MenuImpl)
