// @flow
import {h} from 'preact'
import {translate} from 'react-i18next'
import style from './maker-editor.css'
import type {Dispatch, PlayerMap, RootState, T} from '../../types'
import {MakerChooser} from './maker-chooser'
import {connect} from 'preact-redux'
import Button from 'preact-material-components/Button/Button'
import {CHANGE_PLAYERS} from '../../actions/current-game'
import type {CHANGE_PLAYERS_ACTION} from '../../actions/current-game'
import {namesSelector} from '../../selectors/names'
import {roundsSelector} from '../../selectors/rounds'
import {makerSelector} from '../../selectors/ui/settings/maker'

type MakerEditorProps = {
  names: PlayerMap<string>,
  rounds: number,
  maker: string,

  commit: (names: PlayerMap<string>, rounds: number, maker: string) => () => void,
  t: T
}

function DisconnectMakerEditor({names, rounds, maker, commit, t}: MakerEditorProps) {
  return (
    <div>
      <h4>{t('Change maker')}</h4>
      <MakerChooser />
      <Button raised accent className={style.btn} onClick={commit(names, rounds, maker)}>{t('Change maker')}</Button>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  names: namesSelector(state),
  rounds: roundsSelector(state),
  maker: makerSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  commit(names: PlayerMap<string>, rounds: number, maker: string) {
    return () => {
      const action: CHANGE_PLAYERS_ACTION = {
        type: CHANGE_PLAYERS,
        newNames: names,
        maker,
        rounds
      }
      dispatch(action)
    }
  }
})

export const MakerEditor = translate()(connect(mapStateToProps, mapDispatchToProps)(DisconnectMakerEditor))
