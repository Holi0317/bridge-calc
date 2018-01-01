import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {returntypeof} from 'react-redux-typescript'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {prevNamesSelector} from '../../prev-games/selectors/prev-names'
import {IRootState, ITranslateMixin} from '../../types'
import {EmptyNamesPlaceholder} from './empty-names-placeholder'
import List from 'material-ui/List'
import {NameListEntry} from './name-list-entry'

const mapStateToProps = (state: IRootState) => ({
  names: prevNamesSelector(state)
})

const stateType = returntypeof(mapStateToProps)

type ImportNamesContentProps = typeof stateType & ITranslateMixin

export function ImportNamesContentImpl({names, t}: ImportNamesContentProps) {
  if (names.length === 0) {
    return <EmptyNamesPlaceholder />
  }
  return <List>
    {names.map((name, i) => (
      <NameListEntry key={`name-list-${i}`} name={name} />
    ))}
  </List>
}

export const ImportNamesContent = flowRight(
  translate(),
  connect(mapStateToProps)
)(ImportNamesContentImpl)
