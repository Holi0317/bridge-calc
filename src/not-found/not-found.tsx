import * as React from 'react'
import {translate} from 'react-i18next'
import {Link} from 'react-router-dom'
import AlertError from '@material-ui/icons/Error'
import {ITranslateMixin} from '../types'
import classes from './not-found.pcss'

export function NotFoundImpl({t}: ITranslateMixin) {
  return <div className={classes.container}>
    <AlertError className={classes.icon} />
    <div className={classes.text}>{t('Page not found!')}</div>
    <Link className={classes.link} to="/">{t('Click here to return to main menu')}</Link>
  </div>
}

export const NotFound = translate()(NotFoundImpl)
