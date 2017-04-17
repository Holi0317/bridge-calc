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

function missingKey(lng, ns, key, fallbackValue) {
  const data = {lng, ns, key, fallbackValue}
  // eslint-disable-next-line no-console
  console.warn('[i18next] Missing translation key.', data)
}

export const i18n = I18next
  .use(XHR)
  .use(Cache)
  .use(LngDetector)
  .init({
    nsSeparator: false,
    keySeparator: false,
    ns: 'default',
    defaultNS: 'default',
    fallbackLng: 'en',
    lowerCaseLng: true,
    missingKeyHandler: missingKey,
    backend: {
      loadPath: '{{lng}}',
      parse: data => data,
      ajax: loadLocales
    },
    cache: {
      enabled: process.env.NODE_ENV === 'production'
    }
  })

export function getT(): T {
  return i18n.t.bind(i18n)
}

export type T = (translate: string, opt?: any) => string
