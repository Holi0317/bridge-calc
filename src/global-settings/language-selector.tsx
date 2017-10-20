import * as React from 'react'
import {TranslationFunction} from 'i18next'
import {translate} from 'react-i18next'
import {Dropdown} from '../material/dropdown'
import {i18n, languages} from '../app/i18n'
import {IDropdownSource, ITranslateMixin} from '../types'
import Snackbar from 'material-ui/Snackbar'

interface ILanguageSelectorState {
  open: boolean
  message: string
}

function transformLanguageArray(t: TranslationFunction): Array<IDropdownSource<string>> {
  return languages.filter(lang => lang !== 'cimode') // Filter away 'cimode' pseudo language created by i18next
    .map(lang => ({
      value: lang,
      label: t(lang)
    }))
}

export class LanguageSelectorImpl extends React.Component {
  public props: ITranslateMixin
  public state: ILanguageSelectorState = {
    open: false,
    message: ''
  }

  public render() {
    const {t} = this.props
    const {message, open} = this.state
    return (
      <div>
        <Dropdown label={t('Change language')}
                  value={i18n.language}
                  source={transformLanguageArray(t)}
                  onChange={this.changeLanguage}
        />
        <Snackbar message={message} open={open} onRequestClose={this.handleRequestClose} />
      </div>
    )
  }

  private changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang, err => {
      const message = err
        ? this.props.t('Error when changing language. Error: {{err}}', {err: err.message})
        : this.props.t('Changed language successfully')
      this.setState(() => ({
        open: true,
        message
      }))
    })
  }

  private handleRequestClose = () => {
    this.setState({
      open: false,
      message: ''
    })
  }
}

export const LanguageSelector = translate()(LanguageSelectorImpl as any)
