import * as React from 'react'
import {translate} from 'react-i18next'
import {Link} from 'react-router-dom'
import {JokerIcon} from './joker-icon'
import {ITranslateMixin} from '../types'
import styles from './no-prev-game-placeholder.css'

export function NoPrevGamePlaceholderImpl({t}: ITranslateMixin) {
  return <div className={styles.container}>
    <JokerIcon className={styles.jokerIcon} />
    <div>{t("You don't have any played game yet.")}</div>
    <Link to="/entry" className={styles.startLink}>{t('Click here to start a new game')}</Link>
  </div>
}

export const NoPrevGamePlaceholder = translate()(NoPrevGamePlaceholderImpl as any)
