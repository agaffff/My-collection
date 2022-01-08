import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import translationEN from './locales/en/translationEN.json';
import translationRU from './locales/ru/translationRU.json';

const resources = {
    ru:{
        translation: translationRU
    },
    en:{
        translation: translationEN
    }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
      resources,
    
      fallbackLng:'en',
      detection: {
          order:['localStorage','htmlTag', 'cookie'],
          caches:['localStorage']
      },
      backend:{
          loadPath: './locales/{{lng}}/translation.json',
      },
      react: {useSuspense:false}
      
  });

  export default i18n;