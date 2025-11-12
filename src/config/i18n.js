

// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
// // import en from "../locales/en/translation.json";
// // import hi from "../locales/hi/translation.json";

// import en from "../../public/locales/en/translation.json";
// import hi from "../../public/locales/hi/translation.json";


// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: { translation: en },
//       hi: { translation: hi },
//     },
//     fallbackLng: "en",
//     interpolation: { escapeValue: false },
//     detection: { order: ["localStorage", "navigator"] },
//   });

// export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "../locales/en/translation.json";
import hiTranslation from "../locales/hi/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      hi: { translation: hiTranslation }
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "mealex_lang_selected",
    }
  });

export default i18n;
