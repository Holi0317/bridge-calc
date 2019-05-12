import i18next from "i18next";
import Backend from "i18next-chained-backend";
import LocalStorageBackend from "i18next-localstorage-backend";
import LngDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import { languages } from "./languages";

function loadLocales(url: string, _options: any, callback: any) {
  import(`./locals/${url}.js` /* webpackChunkName: "i18n-[index]" */)
    .then(local => {
      callback(local.default, { status: "200" });
    })
    .catch(() => {
      callback(null, { status: "404" });
    });
}

export const i18n = i18next
  .use(Backend)
  .use(LngDetector)
  .use(initReactI18next)
  .init({
    backend: {
      backends: [LocalStorageBackend, XHR],
      backendOptions: [
        {
          expirationTime:
            process.env.NODE_ENV === "production" ? 7 * 24 * 60 * 60 * 1000 : 1
        },
        {
          ajax: loadLocales,
          loadPath: "{{lng}}",
          parse: (data: any) => data
        }
      ]
    },
    debug: process.env.NODE_ENV === "development",
    defaultNS: "default",
    fallbackLng: "en",
    keySeparator: false,
    lowerCaseLng: true,
    ns: "default",
    nsSeparator: false,
    whitelist: languages
  });
