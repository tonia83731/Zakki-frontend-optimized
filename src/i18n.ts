import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationIN from "./locales/ina/translation.json";
import translationZH from "./locales/ZH/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ina: {
    translation: translationIN,
  },
  zh: {
    translation: translationZH,
  },
};

const searchParams = new URLSearchParams(window.location.search);
const language = searchParams.get("language") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: language, // Set the default language
  fallbackLng: "en",
  keySeparator: false, // Allow for nested translations without using dots
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
