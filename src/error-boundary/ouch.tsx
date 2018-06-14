import * as React from 'react'
import {translate} from 'react-i18next'
import {ITranslateMixin} from '../types'
import classes from './ouch.pcss'

function reload() {
  window.location.reload()
}

interface IOuchProps {
  error: Error
}

export function OuchImpl({error, t}: IOuchProps & ITranslateMixin) {
  return (
    <div className={classes.centerContainer}>
      <div className={classes.sadFace}>
        :-(
      </div>
      <div className={classes.text}>
        {t('Ouch! An error has occurred.')}
      </div>
      <div className={classes.reloadLink} onClick={reload}>
        {t('Hopefully your data is safe. Refresh page may fix the problem.')}
      </div>
      <div className={classes.errorMessage}>
        {t('Error message: {{message}}', {message: error.message})}
      </div>
    </div>
  )
}

export const Ouch = translate()(OuchImpl)
