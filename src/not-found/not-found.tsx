import * as React from 'react'
import {translate} from 'react-i18next'
import {Link} from 'react-router-dom'
import AlertError from 'material-ui/svg-icons/alert/error'
import {ITranslateMixin} from '../types'
import styles from './not-found.css'

export function NotFoundImpl({t}: ITranslateMixin) {
  return <div className={styles.container}>
    <AlertError className={styles.icon} />
    <div className={styles.text}>{t('Page not found!')}</div>
    <Link className={styles.link} to="/">{t('Click here to return to main menu')}</Link>
  </div>
}

export const NotFound = translate()(NotFoundImpl as any)
