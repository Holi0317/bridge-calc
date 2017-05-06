// @flow
import I18next from 'i18next'
import Cache from 'i18next-localstorage-cache'
import LngDetector from 'i18next-browser-languagedetector'
import XHR from 'i18next-xhr-backend'

function loadLocales(url, options, callback) {
  System.import(`./locals/${url}.yml`)
    .then(local => {
      callback(local, {status: '200'})
    })
    .catch(() => {
      callback(null, {status: '404'})
    })
}

const languages = ['en', 'zh', 'zh-tw']

export const i18n = I18next
  .use(XHR)
  .use(Cache)
  .use(LngDetector)
  .init({
    debug: process.env.NODE_ENV === 'development',
    nsSeparator: false,
    keySeparator: false,
    ns: 'default',
    defaultNS: 'default',
    fallbackLng: 'en',
    whitelist: languages,
    lowerCaseLng: true,
    backend: {
      loadPath: '{{lng}}',
      parse: data => data,
      ajax: loadLocales
    },
    cache: {
      enabled: process.env.NODE_ENV === 'production'
    }
  })
