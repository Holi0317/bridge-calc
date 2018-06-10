import * as React from 'react'
import {bindActionCreators} from 'redux'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {Dropdown} from '../../../material/dropdown'
import {namesSelector} from '../../selectors/names'
import {roundsSelector} from '../../selectors/rounds'
import {makerSelector} from '../selectors/maker'
import {namesChangedSelector} from '../selectors/names-changed'
import {makerSourceSelector} from '../selectors/maker-source'
import {changePlayersAction} from '../../actions/change-players'
import {initSettingsAction} from '../actions/init-settings'
import {setMakerAction} from '../actions/set-maker'
import {toggleExpandAction} from '../actions/toggle-expand'
import {showToastAction} from '../../../toast-singleton/actions/show-toast'
import {PANEL} from '../panel'
import {IRootState, ITranslateMixin, Dispatch} from '../../../types'
import style from '../settings.css'

const mapStateToProps = (state: IRootState) => ({
  names: namesSelector(state),
  namesSource: makerSourceSelector(state),
  rounds: roundsSelector(state),
  maker: makerSelector(state),
  disabled: namesChangedSelector(state),
  expanded: state.gameSettings.panelExpanded[PANEL.CHANGE_MAKER],
  currentGame: state.currentGame,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    changePlayers: changePlayersAction,
    init: initSettingsAction,
    setMaker: setMakerAction,
    toggleExpand: toggleExpandAction,
    showToast: showToastAction
  }, dispatch)

type stateType = ReturnType<typeof mapStateToProps>
type dispatchType = ReturnType<typeof mapDispatchToProps>

export class MakerEditorImpl extends React.Component {
  public props: stateType & dispatchType & ITranslateMixin

  public render() {
    const {maker, namesSource, disabled, expanded, setMaker, toggleExpand, t} = this.props

    const subHeading = disabled
      ? t('Maker edit is disabled when editing player names')
      : t('Change maker of current round')

    return (
      <div className={style.panelContainer}>
        <ExpansionPanel expanded={expanded && !disabled} disabled={disabled} onChange={() => toggleExpand(PANEL.CHANGE_MAKER)}>

          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={style.panelHeading}>
              <Typography className={style.heading}>Change maker</Typography>
            </div>
            <div className={style.panelSubheading}>
              <Typography className={style.secondaryHeading} color="textSecondary">{subHeading}</Typography>
            </div>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <Dropdown label={t('Maker')} disabled={disabled}
                              source={disabled ? [] : namesSource} value={disabled ? '' : maker || ''} onChange={setMaker} />
          </ExpansionPanelDetails>

          <ExpansionPanelActions>
            <Button variant="contained" color="primary" disabled={disabled} onClick={this.commit}>{t('Change maker')}</Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    )
  }

  private commit = () => {
    const {names, rounds, maker, changePlayers, showToast, t} = this.props
    changePlayers(names, maker!, rounds!)
    showToast(t('Maker changed!'))

    // Reset game settings in next tick
    window.setTimeout(() => {
      const {currentGame, init} = this.props
      init(currentGame)
    }, 0)
  }
}

export const MakerEditor = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(MakerEditorImpl)
