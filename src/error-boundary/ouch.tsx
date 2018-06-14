import * as React from 'react'
import {translate} from 'react-i18next'
import {ITranslateMixin} from '../types'
import style from './ouch.pcss'

function reload() {
  window.location.reload()
}

interface IOuchProps {
  error: Error
}

export function OuchImpl({error, t}: IOuchProps & ITranslateMixin) {
  return (
    <div className={style.centerContainer}>
      <div className={style.sadFace}>
        :-(
      </div>
      <div className={style.text}>
        {t('Ouch! An error has occurred.')}
      </div>
      <div className={style.reloadLink} onClick={reload}>
        {t('Hopefully your data is safe. Refresh page may fix the problem.')}
      </div>
      <div className={style.errorMessage}>
        {t('Error message: {{message}}', {message: error.message})}
      </div>
    </div>
  )
}

export const Ouch = translate()(OuchImpl)
