import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from "../i18n/locales/en.json";
import errorMessages from "../i18n/locales/messages.json";
const resources = {
    en: {
        translation: translationEN
    },
    message: {
        message: errorMessages
    }
}

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        fallbackLng: 'en',
        debug: true,

        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;