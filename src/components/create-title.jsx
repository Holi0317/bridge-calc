// @flow
import {h} from 'preact'
import style from './titles.css'
import {translate} from 'react-i18next'

export function createTitle(title: string) {
  const comp = ({t}) => (<h1 className={style.title}>{t(title)}</h1>)
  return translate()(comp)
}
