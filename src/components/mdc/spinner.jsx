// @flow
import {h} from 'preact'
import style from './spinner.css'

export function Spinner() {
  return (
    <div className={style.spinner}>
      <svg className={style.circular} viewBox="25 25 50 50">
        <circle className={style.path} cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
      </svg>
    </div>
  )
}
