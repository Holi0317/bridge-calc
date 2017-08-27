// @flow
import {h} from 'preact'
import {connect} from 'preact-redux'
import {translate} from 'react-i18next'
import {Dropdown} from '../mdc/dropdown'
import {makerSourceSelector} from '../../selectors/ui/settings/maker-source'

import {SET_MAKER} from '../../actions/ui/settings'
import type {Dispatch, IDropdownSource, RootState, I18nT} from '../../types'
import {makerSelector} from '../../selectors/ui/settings/maker'
import type {ISetMakerAction} from '../../actions/ui/settings'

type MakerChooserProps = {
  names: IDropdownSource<string>[],
  maker: ?string,

  onChange: (ID: string) => void,

  t: I18nT
}

function DisconnectMakerChooser({names, maker, onChange, t}: MakerChooserProps) {
  return (
    <Dropdown label={t('Maker')} source={names} value={maker} onChange={onChange} />
  )
}

const mapStateToProps = (state: RootState) => ({
  names: makerSourceSelector(state),
  maker: makerSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChange(ID: string) {
    const action: ISetMakerAction = {
      type: SET_MAKER,
      maker: ID
    }
    dispatch(action)
  }
})

export const MakerChooser = translate()(connect(mapStateToProps, mapDispatchToProps)(DisconnectMakerChooser))
