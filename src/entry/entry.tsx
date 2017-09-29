import * as React from 'react'
import {translate} from 'react-i18next'
import {EntryPlayerList} from './entry-player-list'
import {InitEntryState} from './init-entry-state'
import {EntryActionButtons} from './entry-action-buttons'
import {CollapsedEntryOptions} from './collapsed-entry-options'
import {EntryStartButton} from './entry-start-button'
import {ITranslateMixin} from '../types'
import grid from '../styles/grid.css'

type EntryProps = ITranslateMixin

export function EntryImpl({t}: EntryProps) {
  return (
    <div className={grid.container}>
      <h3>{t('Player Names')}</h3>
      <EntryPlayerList />
      <EntryActionButtons />
      <hr />

      <CollapsedEntryOptions />

      <EntryStartButton />
      <InitEntryState />
    </div>
  )
}

export const Entry = translate()(EntryImpl as any)
