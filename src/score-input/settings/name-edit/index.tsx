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
import {NameEditor} from './name-editor'

const mapStateToProps = (state: IRootState) => ({
  disabled: state.gameSettings.makerDirty,
  expanded: state.gameSettings.panelExpanded[PANEL.NAME_EDIT]
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

    return <div className={style.panelContainer}>
      <ExpansionPanel expanded={expanded && !disabled} disabled={disabled} onChange={() => toggleExpand(PANEL.NAME_EDIT)}>

        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={style.panelHeading}>
            <Typography className={style.heading}>{t('Edit players')}</Typography>
          </div>
          <div className={style.panelSubheading}>
            <Typography className={style.secondaryHeading} color="textSecondary">{subHeading}</Typography>
          </div>
        </ExpansionPanelSummary>

        <NameEditor />

      </ExpansionPanel>
    </div>

  }
}

export const NameEdit = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(NameEditImpl)
