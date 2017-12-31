import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import {IRootState, ITranslateMixin} from '../../types'
import {returntypeof} from 'react-redux-typescript'
import style from './player-editor.css'
import {addRandomNameAction} from './actions/add-name'
import {SettingsPlayerList} from './settings-player-list'
import {bindActionCreators, Dispatch} from 'redux'

const mapStateToProps = (state: IRootState, {t}: ITranslateMixin) => ({
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    addPlayer: addRandomNameAction
  }, dispatch)

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

/**
 * Edit player's names, order and delete them
 */
export class PlayerEditorImpl extends React.Component {
  public props: typeof stateType & typeof dispatchType & ITranslateMixin

  public render() {
    const {addPlayer, t} = this.props
    return (
      <div>
        <h4>{t('Edit players')}</h4>
        <SettingsPlayerList />
        <div className={style.addContainer}>
          <IconButton tooltip={t('Add player')} onClick={addPlayer}>
            <ContentAdd width="28px" height="28px" />
          </IconButton>
        </div>
        <div className={style.btnContainer}>
          <RaisedButton label={t('Change names')} primary={true} className={style.startBtn} disabled={true} onClick={this.dispatch} />
        </div>
      </div>
    )
  }

  private dispatch = () => {
    // TODO Show maker chooser, max rounds chooser in a dialog.
    // TODO Validation: Will added player cause insufficient rounds?
  }
}

export const PlayerEditor = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(PlayerEditorImpl)
