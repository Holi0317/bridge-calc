import * as React from 'react'
import {bindActionCreators, Dispatch} from 'redux'
import flowRight from 'lodash-es/flowRight'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import {Dropdown} from '../../../material/dropdown'
import {namesSelector} from '../../selectors/names'
import {roundsSelector} from '../../selectors/rounds'
import {makerSelector} from '../selectors/maker'
import {namesChangedSelector} from '../selectors/names-changed'
import {makerSourceSelector} from '../selectors/maker-source'
import {changePlayersAction} from '../../actions/change-players'
import {initSettingsAction} from '../actions/init-settings'
import {setMakerAction} from '../actions/set-maker'
import {showToastAction} from '../../../toast-singleton/actions/show-toast'
import {$call, IRootState, ITranslateMixin} from '../../../types'
import style from './maker-editor.css'

const mapStateToProps = (state: IRootState) => ({
  names: namesSelector(state),
  namesSource: makerSourceSelector(state),
  rounds: roundsSelector(state),
  maker: makerSelector(state),
  disabled: namesChangedSelector(state),
  currentGame: state.currentGame,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    changePlayers: changePlayersAction,
    init: initSettingsAction,
    setMaker: setMakerAction,
    showToast: showToastAction
  }, dispatch)

const stateType = $call(mapStateToProps)
const dispatchType = $call(mapDispatchToProps)

export class MakerEditorImpl extends React.Component {
  public props: typeof stateType & typeof dispatchType & ITranslateMixin

  public render() {
    const {maker, namesSource, disabled, setMaker, t} = this.props

    return (
      <div>
        <div className={style.chooserContainer}>
          <Dropdown label={t('Maker')} disabled={disabled}
                    source={disabled ? [] : namesSource} value={disabled ? '' : maker || ''} onChange={setMaker} />
          <RaisedButton primary={true} disabled={disabled} label={t('Change maker')} onClick={this.commit} />
        </div>
        {disabled
          ? <div className={style.disabledHint}>{t('Maker edit is disabled when editing player names')}</div>
          : null}
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
