import * as React from 'react'
import {translate} from 'react-i18next'
import {SettingsPlayerList} from './settings-player-list'
import {SettingsAddPlayer} from './settings-add-player'
import {ActionButtons} from './action-buttons'
import {ITranslateMixin} from '../../../types'

export function NameEditImpl({t}: ITranslateMixin) {
  return (
    <div>
      <h4>{t('Edit players')}</h4>
      <SettingsPlayerList />
      <SettingsAddPlayer />
      <ActionButtons />
    </div>
  )
}

export const NameEdit = translate()(NameEditImpl)
