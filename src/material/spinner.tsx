import * as React from 'react'
import style from './spinner.pcss'

export function Spinner() {
  return (
    <div className={style.spinner}>
      <svg className={style.circular} viewBox="25 25 50 50">
        <circle className={style.path} cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
      </svg>
    </div>
  )
}
