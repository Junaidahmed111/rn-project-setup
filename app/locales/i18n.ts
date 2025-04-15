import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en/en.json';
import fr from './fr/fr.json';

const resources = {
  en: {
    translation: en, // Make sure it's wrapped in 'translation'
  },
  fr: {
    translation: fr, // Make sure it's wrapped in 'translation'
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
