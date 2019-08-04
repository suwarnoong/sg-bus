import { NativeModules, AsyncStorage } from 'react-native';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { IS_ANDROID } from '../constants';

const locale = IS_ANDROID
  ? NativeModules.I18nManager.localeIdentifier
  : NativeModules.SettingsManager.settings.AppleLocale;

const languageDetector = {
  type: 'languageDetector',
  async: true, // async detection
  detect: async callback => {
    const language = await AsyncStorage.getItem('languageCode');
    callback(language || locale.replace('_', '-'));
  },
  init: () => {},
  cacheUserLanguage: lang => {
    AsyncStorage.setItem('languageCode', lang);
  }
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: require('./en.json')
      },
      id: {
        translations: require('./id.json')
      },
      zh: {
        translations: require('./zh.json')
      },
      ta: {
        translations: require('./ta.json')
      }
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

export default i18next;
