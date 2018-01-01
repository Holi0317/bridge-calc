import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators, Dispatch} from 'redux'
import {TranslationFunction} from 'i18next'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {returntypeof} from 'react-redux-typescript'
import {Dropdown} from '../material/dropdown'
import {showToastAction} from '../toast-singleton/actions/show-toast'
import {languages} from '../app/i18n'
import {IDropdownSource, ITranslateMixin} from '../types'

function transformLanguageArray(t: TranslationFunction): Array<IDropdownSource<string>> {
  return languages.filter(lang => lang !== 'cimode') // Filter away 'cimode' pseudo language created by i18next
    .map(lang => ({
      value: lang,
      label: t(lang)
    }))
}

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    showToast: showToastAction
  }, dispatch)

const dispatchType = returntypeof(mapDispatchToProps)

export class LanguageSelectorImpl extends React.Component {
  public props: typeof dispatchType & ITranslateMixin

  public render() {
    const {i18n, t} = this.props
    return <div>
      <Dropdown label={t('Change language')}
                value={i18n.language}
                source={transformLanguageArray(t)}
                onChange={this.changeLanguage}
      />
    </div>
  }

  private changeLanguage = (lang: string) => {
    const {i18n} = this.props
    i18n.changeLanguage(lang, err => {
      const {showToast, t} = this.props
      const message = err
        ? t('Error when changing language. Error: {{err}}', {err: err.message})
        : t('Changed language successfully')
      showToast(message)
    })
  }
}

export const LanguageSelector = flowRight(
  translate(),
  connect(null, mapDispatchToProps)
)(LanguageSelectorImpl)
