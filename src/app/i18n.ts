import * as I18next from 'i18next'
import * as Cache from 'i18next-localstorage-cache'
import * as LngDetector from 'i18next-browser-languagedetector'
import * as XHR from 'i18next-xhr-backend'
import {languages} from './languages'

function loadLocales(url: string, _options: any, callback: any) {
  import(`./locals/${url}.js` /* webpackChunkName: "i18n-[index]" */)
    .then(local => {
      callback(local.default, {status: '200'})
    })
    .catch(() => {
      callback(null, {status: '404'})
    })
}

export const i18n = I18next
  .use(XHR)
  .use(Cache)
  .use(LngDetector)
  .init({
    backend: {
      ajax: loadLocales,
      loadPath: '{{lng}}',
      parse: (data: any) => data
    },
    cache: {
      enabled: process.env.NODE_ENV === 'production'
    },
    debug: process.env.NODE_ENV === 'development',
    defaultNS: 'default',
    fallbackLng: 'en',
    keySeparator: false,
    lowerCaseLng: true,
    ns: 'default',
    nsSeparator: false,
    whitelist: languages
  })
