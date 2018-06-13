import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {Container, Row, Col} from 'react-grid-system'
import AvPlayArrow from '@material-ui/icons/PlayArrow'
import AvFiberNew from '@material-ui/icons/FiberNew'
import AvSkipPrevious from '@material-ui/icons/SkipPrevious'
import ActionSettings from '@material-ui/icons/Settings'
import ActionInfo from '@material-ui/icons/Info'
import ActionBugReport from '@material-ui/icons/BugReport'
import {Tile} from './tile'
import {showContinueSelector} from './show-continue-selector'
import {IRootState, ITranslateMixin} from '../types'

const mapStateToProps = (state: IRootState) => ({
  showContinue: showContinueSelector(state)
})

type stateType = ReturnType<typeof mapStateToProps>

type MenuProps = stateType & ITranslateMixin

export function MenuImpl({showContinue, t}: MenuProps) {
  return (
    <Container>
      {showContinue
        ? <Row>
          <Col xs={12}>
            <Tile icon={<AvPlayArrow color="action" />} title={t('Continue')} to="/score-input" />
          </Col>
        </Row>
        : null
      }

      <Row>
        <Col md={6} xs={12}>
          <Tile icon={<AvFiberNew color="action" />} title={t('New Game')} to="/entry" />
        </Col>
        <Col md={6} xs={12}>
          <Tile icon={<AvSkipPrevious color="action" />} title={t('Previous games')} to="/prev-games" />
        </Col>
      </Row>

      <Row>
        <Col md={4} xs={12}>
          <Tile icon={<ActionSettings color="action" />} title={t('Settings')} to="/global-settings" />
        </Col>
        <Col md={4} xs={12}>
          <Tile icon={<ActionInfo color="action" />} title={t('Information')} to="https://gitlab.com/holi0317/bridge-calc/blob/master/docs/en.md" external={true} target="_blank" />
        </Col>
        <Col md={4} xs={12}>
          <Tile icon={<ActionBugReport color="action" />} title={t('Support/bug')} to="https://gitlab.com/holi0317/bridge-calc/issues" external={true} target="_blank" />
        </Col>
      </Row>

    </Container>
  )
}

export const Menu = flowRight(
  translate(),
  connect(mapStateToProps)
)(MenuImpl)
