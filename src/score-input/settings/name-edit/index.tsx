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
import {nameEditDisabledSelector} from '../selectors/name-edit-disabled'
import {expandedPanelSelector} from '../selectors/expanded-panel'
import {PANEL} from '../panel'
import {NameEditor} from './name-editor'
import {Dispatch, IRootState, ITranslateMixin} from '../../../types'
import classes from '../settings.pcss'

const mapStateToProps = (state: IRootState) => ({
  disabled: nameEditDisabledSelector(state),
  expanded: expandedPanelSelector(state) === PANEL.NAME_EDIT
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    toggleExpand: toggleExpandAction
  }, dispatch)

type stateType = ReturnType<typeof mapStateToProps>
type dispatchType = ReturnType<typeof mapDispatchToProps>

export class NameEditImpl extends React.Component {
  public props: stateType & dispatchType & ITranslateMixin

  public render() {
    const {expanded, disabled, toggleExpand, t} = this.props
    const subHeading = disabled
      ? t('Player name edit is disabled when editing maker')
      : t('Add, remove or change names of players')

    return <ExpansionPanel expanded={expanded && !disabled} disabled={disabled} onChange={() => toggleExpand(PANEL.NAME_EDIT)}>

        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.panelHeading}>
            <Typography className={classes.heading}>{t('Edit players')}</Typography>
          </div>
          <div className={classes.panelSubheading}>
            <Typography className={classes.secondaryHeading} color="textSecondary">{subHeading}</Typography>
          </div>
        </ExpansionPanelSummary>

        <NameEditor />

      </ExpansionPanel>

  }
}

export const NameEdit = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(NameEditImpl)
