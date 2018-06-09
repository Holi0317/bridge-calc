import * as React from 'react'
import {translate} from 'react-i18next'
import Button from '@material-ui/core/Button'
import {EntryOptions} from './entry-options'
import {ITranslateMixin} from '../types'
import style from './entry.css'
import Collapse from '@material-ui/core/Collapse/Collapse'

interface ICollapsedEntryOptionsState {
  expanded: boolean
}

export class CollapsedEntryOptionsImpl extends React.Component<ITranslateMixin, ICollapsedEntryOptionsState> {
  public state = {
    expanded: false
  }

  public render() {
    const {t} = this.props
    const {expanded} = this.state

    return (
      <div className={style.optionsSection}>
        <Button variant="contained" onClick={this._toggleOptionOpen} className={style.optionsBtn}>{t('Options')}</Button>
        <Collapse in={expanded}>
          <EntryOptions/>
        </Collapse>
      </div>
    )
  }

  private _toggleOptionOpen = () => {
    this.setState(state => ({
      expanded: !state.expanded
    }))
  }
}

export const CollapsedEntryOptions = translate()(CollapsedEntryOptionsImpl)
