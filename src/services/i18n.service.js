
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    header: {
                        Dashboard: 'Dashboard',
                        About: 'About',
                        Toys: 'Toys',
                        Home: 'Home'
                    }

                }
            },
            he: {
                translation: {
                    header: {
                        Dashboard: 'לוח בקרה',
                        About: 'מי אנחנו',
                        Toys: 'צעצועים',
                        Home: 'בית'
                    }

                }
            }
        }
    })