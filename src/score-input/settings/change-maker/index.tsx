import * as React from 'react'
import {bindActionCreators} from 'redux'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {changeMakerDisabledSelector} from '../selectors/change-maker-disabled'
import {expandedPanelSelector} from '../selectors/expanded-panel'
import {toggleExpandAction} from '../actions/toggle-expand'
import {PANEL} from '../panel'
import {MakerEditor} from './maker-editor'
import {Dispatch, IRootState, ITranslateMixin} from '../../../types'
import classes from '../settings.pcss'

const mapStateToProps = (state: IRootState) => ({
  disabled: changeMakerDisabledSelector(state),
  expanded: expandedPanelSelector(state) === PANEL.CHANGE_MAKER
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    toggleExpand: toggleExpandAction
  }, dispatch)

type stateType = ReturnType<typeof mapStateToProps>
type dispatchType = ReturnType<typeof mapDispatchToProps>

export class ChangeMakerImpl extends React.Component {
  public props: stateType & dispatchType & ITranslateMixin

  public render() {
    const {expanded, disabled, toggleExpand, t} = this.props
    const subHeading = disabled
      ? t('Maker edit is disabled when editing player names')
      : t('Change maker of current round')

    return (
      <ExpansionPanel expanded={expanded && !disabled} disabled={disabled} onChange={() => toggleExpand(PANEL.CHANGE_MAKER)}>

        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.panelHeading}>
            <Typography className={classes.heading}>{t('Change maker')}</Typography>
          </div>
          <div className={classes.panelSubheading}>
            <Typography className={classes.secondaryHeading} color="textSecondary">{subHeading}</Typography>
          </div>
        </ExpansionPanelSummary>

        <MakerEditor />

      </ExpansionPanel>
    )
  }
}

export const ChangeMaker = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(ChangeMakerImpl)
