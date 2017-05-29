// @flow
import {h} from 'preact'
import {translate} from 'react-i18next'

export function createTitle(title: string) {
  const comp = ({t}) => (<span>{t(title)}</span>)
  return translate()(comp)
}
