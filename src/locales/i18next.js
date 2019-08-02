import { NativeModules } from 'react-native';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { IS_ANDROID } from '../constants';

const locale = IS_ANDROID
  ? NativeModules.I18nManager.localeIdentifier
  : NativeModules.SettingsManager.settings.AppleLocale;

const languageDetector = {
  type: 'languageDetector',
  async: true, // async detection
  detect: cb => {
    return cb(locale.replace('_', '-'));
  },
  init: () => {},
  cacheUserLanguage: () => {}
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: require('./en.json')
      },
      id: {
        translations: require('./id.json')
      }
      // zh: {
      //   translations: require('./zh.json')
      // }
    },
    fallbackLng: 'en',
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });
