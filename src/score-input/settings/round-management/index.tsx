import * as React from 'react'
import {bindActionCreators} from 'redux'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {toggleExpandAction} from '../actions/toggle-expand'
import {PANEL} from '../panel'
import {IRootState, ITranslateMixin, Dispatch} from '../../../types'
import style from '../settings.css'
import {SkipRounds} from './skip-rounds'

const mapStateToProps = (state: IRootState) => ({
  expanded: state.gameSettings.panelExpanded[PANEL.ROUND_MANAGEMENT]
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    toggleExpand: toggleExpandAction
  }, dispatch)

type stateType = ReturnType<typeof mapStateToProps>
type dispatchType = ReturnType<typeof mapDispatchToProps>

export class RoundManagementImpl extends React.Component {
  public props: stateType & dispatchType & ITranslateMixin

  public render() {
    const {expanded, toggleExpand, t} = this.props

    return (
      <ExpansionPanel expanded={expanded}
                      onChange={() => toggleExpand(PANEL.ROUND_MANAGEMENT)}>

        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <div className={style.panelHeading}>
            <Typography className={style.heading}>{t('Skip rounds')}</Typography>
          </div>
          <div className={style.panelSubheading}>
            <Typography className={style.secondaryHeading} color="textSecondary">{t('Jump to other rounds')}</Typography>
          </div>
        </ExpansionPanelSummary>

        <SkipRounds/>

      </ExpansionPanel>
    )
  }
}

export const RoundManagement = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(RoundManagementImpl)
