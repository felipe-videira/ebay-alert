import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import backend from "i18next-xhr-backend";
import detector from "i18next-browser-languagedetector";

i18n
  .use(detector)
  .use(backend)
  .use(initReactI18next) 
  .init({
    lng: "en",
    fallbackLng: "en",
    keySeparator: false, 
    interpolation: {
      escapeValue: false 
    },
    backend: {
      crossDomain: true,
      loadPath: `${process.env.REACT_APP_API_HOST}/locale/{{lng}}`,
    },
  });

  export default i18n;