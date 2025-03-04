import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationIN from "./locales/ina/translation.json";
import translationZH from "./locales/zh/translation.json";

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
const storedLanguage = localStorage.getItem("language");
const urlLanguage = searchParams.get("language");
const defaultLanguage = storedLanguage || urlLanguage || "en";

// Save to `localStorage` if not already set
if (!storedLanguage) {
  localStorage.setItem("language", defaultLanguage);
}

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage, // Set the default language
  fallbackLng: "en",
  keySeparator: false, // Allow for nested translations without using dots
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
