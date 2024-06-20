import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationsInEng from '../locales/en.json'
import translationsInChn from '../locales/cn.json'
import translationsInJpn from '../locales/jp.json'
import translationsInThai from '../locales/th.json'
import translationsInViet from '../locales/vi.json'
import translationsInLao from '../locales/lo.json'

// translations
const resources = {
    en: {
        translation: translationsInEng
    },
    cn: {
        translation: translationsInChn
    },
    jp: {
        translation: translationsInJpn
    },
    th: {
        translation: translationsInThai
    },
    vi: {
        translation: translationsInViet
    },
    lo: {
        translation: translationsInLao
    },
}

i18n
    .use(initReactI18next)  // passes i18n down to react-i18next
    .init({
        resources,  // resources are important to load translations for the languages.
        lng: localStorage.getItem("lang"),  // It acts as default language. When the site loads, content is shown in this language.
        debug: true,
        fallbackLng: "en",  // use en if selected language is not available
        interpolation: {
            escapeValue: false
        },
        ns: "translation",  // namespaces help to divide huge translations into multiple small files.
        defaultNS: "translation"
    })

export default i18n