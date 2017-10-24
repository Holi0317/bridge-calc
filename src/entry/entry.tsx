import * as React from 'react'
import {translate} from 'react-i18next'
import {Grid} from 'react-flexbox-grid'
import {EntryPlayerList} from './entry-player-list'
import {InitEntryState} from './init-entry-state'
import {EntryActionButtons} from './entry-action-buttons'
import {CollapsedEntryOptions} from './collapsed-entry-options'
import {EntryStartButton} from './entry-start-button'
import {ITranslateMixin} from '../types'

type EntryProps = ITranslateMixin

export function EntryImpl({t}: EntryProps) {
  return (
    <Grid>
      <h3>{t('Player Names')}</h3>
      <EntryPlayerList />
      <EntryActionButtons />
      <hr />

      <CollapsedEntryOptions />

      <EntryStartButton />
      <InitEntryState />
    </Grid>
  )
}

export const Entry = translate()(EntryImpl as any)
