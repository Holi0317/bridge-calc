import * as React from 'react'
import {translate} from 'react-i18next'
import {Container} from 'react-grid-system'
import Divider from '@material-ui/core/Divider'
import {EntryPlayerList} from './entry-player-list'
import {InitEntryState} from './init-entry-state'
import {EntryActionButtons} from './entry-action-buttons'
import {CollapsedEntryOptions} from './collapsed-entry-options'
import {EntryStartButton} from './entry-start-button'
import {ImportNamesDialog} from './import-names'
import {ITranslateMixin} from '../types'
import classes from './entry.pcss'

type EntryProps = ITranslateMixin

export function EntryImpl({t}: EntryProps) {
  return (
    <Container>
      <h3 className={classes.text}>{t('Player Names')}</h3>
      <EntryPlayerList />
      <EntryActionButtons />
      <Divider />

      <CollapsedEntryOptions />

      <EntryStartButton />
      <ImportNamesDialog />
      <InitEntryState />
    </Container>
  )
}

export const Entry = translate()(EntryImpl)
