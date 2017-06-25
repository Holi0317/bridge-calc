// @flow
import {h} from 'preact'
import {connect} from 'preact-redux'
import {translate} from 'react-i18next'
import {Dropdown} from '../mdc/dropdown'
import {SET_MAKER} from '../../actions/ui/settings'
import {makerSourceSelector} from '../../selectors/ui/settings/maker-source'

import type {Dispatch, DropdownSource, RootState} from '../../types'
import {makerSelector} from '../../selectors/ui/settings/maker'
import type {SET_MAKER_ACTION} from '../../actions/ui/settings'

type MakerChooserProps = {
  names: DropdownSource<string>[],
  maker: ?string,

  onChange: (ID: string) => void
}

function DisconnectMakerChooser({names, maker, onChange}: MakerChooserProps) {
  return (
    <Dropdown source={names} value={maker} onChange={onChange} />
  )
}

const mapStateToProps = (state: RootState, {t}) => ({
  names: makerSourceSelector(state),
  maker: makerSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChange(ID: string) {
    const action: SET_MAKER_ACTION = {
      type: SET_MAKER,
      maker: ID
    }
    dispatch(action)
  }
})

export const MakerChooser = translate()(connect(mapStateToProps, mapDispatchToProps)(DisconnectMakerChooser))
